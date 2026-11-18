import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { ALLOWED_EXT, ALLOWED_FIELDS, MAX_FILES, MAX_FILE_BYTES, MAX_TOTAL_BYTES, UNIT_OPTIONS } from '@/lib/forms';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* ---------- simple in-memory rate limit (per instance) ---------- */
const hits = new Map<string, number[]>();
function limited(ip: string, max = 6, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > max;
}

const clean = (v: unknown, max = 2000) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max);
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

const schema = z.object({
  formType: z.enum(['general', 'quotation', 'consultation', 'partnership', 'careers', 'unit']),
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().regex(/^[+()\d\s-]{7,20}$/).optional().or(z.literal('')),
  message: z.string().min(5).max(5000),
  consent: z.literal('yes'),
});

/* Magic-byte checks for common binary types */
function signatureOk(ext: string, buf: Buffer) {
  const hex = buf.subarray(0, 8).toString('hex');
  if (ext === 'pdf') return buf.subarray(0, 4).toString() === '%PDF';
  if (ext === 'png') return hex.startsWith('89504e47');
  if (ext === 'jpg' || ext === 'jpeg') return hex.startsWith('ffd8ff');
  if (ext === 'webp') return buf.subarray(0, 4).toString() === 'RIFF' && buf.subarray(8, 12).toString() === 'WEBP';
  if (ext === 'docx' || ext === 'xlsx') return hex.startsWith('504b0304');
  if (ext === 'doc' || ext === 'xls') return hex.startsWith('d0cf11e0');
  if (ext === 'csv' || ext === 'txt') return !buf.subarray(0, 1024).includes(0);
  return false;
}

function unitFrom(fd: FormData): string {
  const slug = clean(fd.get('unitSlug'), 40);
  if (slug && UNIT_OPTIONS.some((u) => u.value === slug)) return slug;
  const label = clean(fd.get('unit'), 80);
  return UNIT_OPTIONS.find((u) => u.label === label)?.value || 'general';
}

function routeTo(unit: string, formType: string) {
  const key = (formType === 'careers' ? 'CAREERS' : formType === 'partnership' ? 'PARTNERSHIPS' : unit).toUpperCase().replace(/-/g, '_');
  return process.env[`ENQUIRY_TO_${key}`] || process.env.ENQUIRY_TO_DEFAULT || 'sales@donmacltd.com';
}

function respond(req: Request, ok: boolean, body: Record<string, unknown>, status = 200) {
  const wantsJson = (req.headers.get('accept') || '').includes('application/json');
  if (wantsJson) return NextResponse.json({ ok, ...body }, { status });
  const url = new URL(ok ? `/thank-you?ref=${encodeURIComponent(String(body.reference || ''))}` : `/contact?error=1`, req.url);
  return NextResponse.redirect(url, 303);
}

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (Number(req.headers.get('content-length') || 0) > MAX_TOTAL_BYTES + 1024 * 1024) return respond(req, false, { error: 'Your upload is too large. Please keep attachments under 25 MB in total.' }, 413);
  if (limited(ip)) return respond(req, false, { error: 'Too many submissions. Please wait a few minutes and try again.' }, 429);

  let fd: FormData;
  try { fd = await req.formData(); } catch { return respond(req, false, { error: 'Invalid submission.' }, 400); }

  const reference = `DMX-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

  // Spam traps: honeypot and minimum completion time. Respond as success so bots learn nothing.
  const t = Number(fd.get('t') || 0);
  if (clean(fd.get('company_website'))) return respond(req, true, { reference });
  if (t && Date.now() - t < 2500) return respond(req, true, { reference });

  // Optional Cloudflare Turnstile verification
  if (process.env.TURNSTILE_SECRET_KEY) {
    const token = clean(fd.get('cf-turnstile-response'), 4000);
    const v = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }) }).then((r) => r.json()).catch(() => ({ success: false }));
    if (!v.success) return respond(req, false, { error: 'Spam check failed. Please refresh the page and try again.' }, 400);
  }

  const parsed = schema.safeParse({
    formType: clean(fd.get('formType'), 20), name: clean(fd.get('name'), 120), email: clean(fd.get('email'), 200),
    phone: clean(fd.get('phone'), 30), message: clean(fd.get('message') || fd.get('load'), 5000), consent: clean(fd.get('consent'), 5),
  });
  if (!parsed.success) return respond(req, false, { error: 'Please check the required fields and try again.', issues: parsed.error.issues.map((i) => i.path.join('.')) }, 422);

  // Collect whitelisted extra fields
  const fields: Record<string, string> = {};
  for (const key of ALLOWED_FIELDS) {
    const vals = fd.getAll(key).filter((v) => typeof v === 'string').map((v) => clean(v));
    if (vals.length && vals.some(Boolean)) fields[key] = vals.filter(Boolean).join(', ');
  }

  // Files
  const files = fd.getAll('attachments').filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) return respond(req, false, { error: `Please attach no more than ${MAX_FILES} files.` }, 400);
  const attachments: { filename: string; content: Buffer }[] = [];
  let total = 0;
  for (const f of files) {
    const ext = (f.name.split('.').pop() || '').toLowerCase();
    if (!ALLOWED_EXT.includes(ext)) return respond(req, false, { error: `File type not accepted: ${f.name}` }, 400);
    if (f.size > MAX_FILE_BYTES) return respond(req, false, { error: `${f.name} is larger than 10 MB.` }, 400);
    total += f.size;
    if (total > MAX_TOTAL_BYTES) return respond(req, false, { error: 'Attachments exceed 25 MB in total.' }, 400);
    const buf = Buffer.from(await f.arrayBuffer());
    if (!signatureOk(ext, buf)) return respond(req, false, { error: `${f.name} does not look like a valid .${ext} file.` }, 400);
    const safe = f.name.replace(/[^\w.\- ]+/g, '_').slice(-120);
    attachments.push({ filename: safe, content: buf });
  }

  const unit = unitFrom(fd);
  const to = routeTo(unit, parsed.data.formType);
  const unitLabel = UNIT_OPTIONS.find((u) => u.value === unit)?.label || 'General';
  const record = { reference, receivedAt: new Date().toISOString(), formType: parsed.data.formType, unit, routedTo: to, name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone, fields, attachments: attachments.map((a) => a.filename), ip };

  // Enquiry tracking: webhook (CRM, Google Sheet, etc.) and/or local JSONL log
  if (process.env.ENQUIRY_WEBHOOK_URL) {
    await fetch(process.env.ENQUIRY_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) }).catch((e) => console.error('[enquiry] webhook failed', e));
  }
  if (process.env.ENQUIRY_LOG_DIR !== 'off') {
    const dir = process.env.ENQUIRY_LOG_DIR || path.join(process.cwd(), '.enquiries');
    await fs.mkdir(dir, { recursive: true }).then(() => fs.appendFile(path.join(dir, 'enquiries.jsonl'), JSON.stringify(record) + '\n')).catch(() => {});
  }

  // Email notification
  const rows = Object.entries({ Reference: reference, 'Business division': unitLabel, 'Form': parsed.data.formType, Name: parsed.data.name, Email: parsed.data.email, Phone: parsed.data.phone || '', ...fields })
    .filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:6px 12px;background:#fdebe0;color:#990000;font-weight:700;vertical-align:top">${esc(k)}</td><td style="padding:6px 12px;white-space:pre-wrap">${esc(String(v))}</td></tr>`).join('');
  const html = `<div style="font-family:Arial,sans-serif;color:#111318"><h2 style="background:#990000;color:#fff;padding:12px 16px;margin:0">New website enquiry: ${esc(unitLabel)}</h2><table style="border-collapse:collapse;width:100%;font-size:14px">${rows}</table><p style="font-size:12px;color:#6b7280">Sent from the Donmac Group website. Attachments: ${attachments.length}.</p></div>`;

  if (process.env.SMTP_HOST) {
    try {
      const transport = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true', auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined });
      const from = process.env.MAIL_FROM || 'Donmac Website <no-reply@donmacltd.com>';
      await transport.sendMail({ from, to, replyTo: parsed.data.email, subject: `[${reference}] ${unitLabel} enquiry from ${parsed.data.name}`, html, attachments });
      if (process.env.ENQUIRY_SEND_ACK !== 'false') {
        await transport.sendMail({ from, to: parsed.data.email, subject: `We have received your enquiry (${reference})`, html: `<div style="font-family:Arial,sans-serif;color:#111318"><p>Dear ${esc(parsed.data.name)},</p><p>Thank you for contacting Donmac Group. Your enquiry has been passed to our ${esc(unitLabel)} team and we aim to respond within one working day.</p><p>Your reference number is <strong>${reference}</strong>.</p><p>Kind regards,<br/>Donmac Group<br/>Plot 27, Nchenja Road, Northmead, Lusaka · +260 966 810170</p></div>` }).catch(() => {});
      }
    } catch (e) {
      console.error('[enquiry] email failed', e);
      return respond(req, false, { error: 'We could not send your enquiry right now. Please email sales@donmacltd.com or call +260 966 810170.' }, 502);
    }
  } else {
    console.warn('[enquiry] SMTP not configured; enquiry logged only', reference);
  }

  return respond(req, true, { reference });
}

export function GET() {
  return NextResponse.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
}
