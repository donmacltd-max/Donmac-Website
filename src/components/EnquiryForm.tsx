'use client';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { FORMS, ALLOWED_EXT, MAX_FILES, MAX_FILE_BYTES, type Field } from '@/lib/forms';

type State = { status: 'idle' | 'sending' | 'ok' | 'error'; message?: string; reference?: string };

export default function EnquiryForm({ variant = 'general', defaults = {}, compact = false, dark = false }: { variant?: string; defaults?: Record<string, string>; compact?: boolean; dark?: boolean }) {
  const cfg = FORMS[variant] ?? FORMS.general;
  const [state, setState] = useState<State>({ status: 'idle' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const tRef = useRef<HTMLInputElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  useEffect(() => { if (tRef.current) tRef.current.value = String(Date.now()); }, []);

  const validate = (fd: FormData) => {
    const e: Record<string, string> = {};
    for (const f of cfg.fields) {
      if (f.type === 'file') {
        const files = fd.getAll(f.name).filter((x): x is File => x instanceof File && x.size > 0);
        if (files.length > MAX_FILES) e[f.name] = `Please attach no more than ${MAX_FILES} files.`;
        for (const file of files) {
          const ext = file.name.split('.').pop()?.toLowerCase() || '';
          if (!ALLOWED_EXT.includes(ext)) e[f.name] = `${file.name}: file type not accepted.`;
          else if (file.size > MAX_FILE_BYTES) e[f.name] = `${file.name} is larger than 10 MB.`;
        }
        continue;
      }
      const v = String(fd.get(f.name) ?? '').trim();
      if (f.required && f.type !== 'checkboxes' && !v) e[f.name] = 'This field is required.';
      if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) e[f.name] = 'Please enter a valid email address.';
      if (f.type === 'tel' && v && !/^[+()\d\s-]{7,20}$/.test(v)) e[f.name] = 'Please enter a valid phone number.';
    }
    if (!fd.get('consent')) e.consent = 'Please confirm you agree to the privacy notice.';
    return e;
  };

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = ev.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`);
      first?.focus();
      return;
    }
    setState({ status: 'sending' });
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || 'We could not send your enquiry. Please try again or email us directly.');
      setState({ status: 'ok', reference: json.reference });
    } catch (err: any) {
      setState({ status: 'error', message: err.message });
    }
  }

  const id = (n: string) => `${variant}-${n}`;
  const lab = dark ? 'label text-white' : 'label';
  const err = (n: string) => errors[n] && <p id={id(n) + '-err'} className="mt-1.5 text-sm font-semibold text-red-600">{errors[n]}</p>;

  if (state.status === 'ok') {
    return (
      <div role="status" className={`rounded-3xl border p-8 ${dark ? 'border-white/15 bg-white/5 text-white' : 'border-mist-line bg-mist'}`}>
        <p className="eyebrow">Enquiry received</p>
        <h3 className="mt-3 text-2xl font-extrabold">Thank you. Your enquiry is with our team.</h3>
        <p className={`mt-3 ${dark ? 'text-white/75' : 'text-ink-soft'}`}>Your reference number is <strong className="font-mono">{state.reference}</strong>. Please quote it in any follow-up. We aim to respond within one working day.</p>
      </div>
    );
  }

  const renderField = (f: Field) => {
    const common = { id: id(f.name), name: f.name, required: f.required, 'aria-invalid': !!errors[f.name] || undefined, 'aria-describedby': errors[f.name] ? id(f.name) + '-err' : f.hint ? id(f.name) + '-hint' : undefined };
    const dv = defaults[f.name];
    const wrap = `${f.full || f.type === 'textarea' || f.type === 'checkboxes' || f.type === 'radio' ? 'sm:col-span-2' : ''}`;
    const req = f.required ? <span className="text-brand-red" aria-hidden="true"> *</span> : null;
    if (f.type === 'checkboxes' || f.type === 'radio') {
      return (
        <fieldset key={f.name} className={wrap}>
          <legend className={lab}>{f.label}{req}</legend>
          <div className="mt-1 flex flex-wrap gap-2">
            {f.options!.map((o) => (
              <label key={o} className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold has-[:checked]:border-brand-orange has-[:checked]:bg-brand-orange/10 ${dark ? 'border-white/20 text-white' : 'border-ink/15 text-ink'}`}>
                <input type={f.type === 'radio' ? 'radio' : 'checkbox'} name={f.name} value={o} className="accent-brand-orange" />{o}
              </label>
            ))}
          </div>
          {err(f.name)}
        </fieldset>
      );
    }
    return (
      <div key={f.name} className={wrap}>
        <label htmlFor={id(f.name)} className={lab}>{f.label}{req}</label>
        {f.type === 'textarea' ? <textarea {...common} rows={compact ? 4 : 5} placeholder={f.placeholder} defaultValue={dv} className="field" maxLength={5000} />
          : f.type === 'select' ? (
            <select {...common} defaultValue={dv && f.options!.includes(dv) ? dv : ''} className="field h-[50px] py-0">
              <option value="" disabled={f.required}>Select…</option>
              {f.options!.map((o) => <option key={o}>{o}</option>)}
            </select>)
          : f.type === 'file' ? <input {...common} type="file" multiple={f.multiple} accept={ALLOWED_EXT.map((e) => '.' + e).join(',')} className={`field cursor-pointer file:mr-4 file:rounded-full file:border-0 file:bg-brand-red file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white ${dark ? '' : ''}`} />
          : <input {...common} type={f.type} placeholder={f.placeholder} defaultValue={dv} className="field" maxLength={200} autoComplete={f.name === 'name' ? 'name' : f.name === 'email' ? 'email' : f.name === 'phone' ? 'tel' : f.name === 'organisation' ? 'organization' : undefined} />}
        {f.hint && <p id={id(f.name) + '-hint'} className={`mt-1.5 text-xs ${dark ? 'text-white/55' : 'text-ink-mute'}`}>{f.hint}</p>}
        {err(f.name)}
      </div>
    );
  };

  const unitLabel = cfg.unit;
  return (
    <form action="/api/enquiry" method="post" encType="multipart/form-data" noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="formType" value={cfg.formType} />
      {unitLabel && <input type="hidden" name="unitSlug" value={unitLabel} />}
      {defaults.service && <input type="hidden" name="service" value={defaults.service} />}
      {defaults.vehicle && !cfg.fields.some((f) => f.name === 'vehicle') && <input type="hidden" name="vehicle" value={defaults.vehicle} />}
      <input ref={tRef} type="hidden" name="t" defaultValue="" />
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={id('company_website')}>Leave this field empty</label>
        <input id={id('company_website')} type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      {cfg.fields.map(renderField)}
      {siteKey && (<><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer /><div className="cf-turnstile sm:col-span-2" data-sitekey={siteKey} /></>)}
      <div className="sm:col-span-2">
        <label className={`flex items-start gap-3 text-sm ${dark ? 'text-white/80' : 'text-ink-soft'}`}>
          <input type="checkbox" name="consent" value="yes" required className="mt-1 h-5 w-5 shrink-0 accent-brand-orange" aria-invalid={!!errors.consent || undefined} />
          <span>I agree that Donmac may use these details to respond to my enquiry, as described in the <Link href="/privacy" className="font-semibold underline">privacy notice</Link>.</span>
        </label>
        {err('consent')}
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary min-w-[220px]" disabled={state.status === 'sending'}>{state.status === 'sending' ? 'Sending…' : 'Submit enquiry'}</button>
        {state.status === 'error' && <p role="alert" className="text-sm font-semibold text-red-600">{state.message}</p>}
      </div>
    </form>
  );
}
