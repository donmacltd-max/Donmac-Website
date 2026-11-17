# Donmac Group corporate website

Production website for Donmac Group (Donmac Limited, Lusaka). Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, with content managed through **Decap CMS** (Git-based, no database) and a secure server-side enquiry API.

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in SMTP and routing addresses
npm run dev                    # http://localhost:3000
npm run build && npm start     # production build
```

Requires Node.js 18.18 or later (Node 20 LTS recommended).

## What is included

| Area | Routes |
|---|---|
| Home | `/` |
| Corporate | `/about`, `/leadership`, `/business-divisions` |
| Business divisions | `/energy`, `/ict`, `/e-mobility`, `/sourcing` |
| Additional capabilities | `/construction`, `/telecommunications` |
| Portfolio | `/projects`, `/projects/[slug]` (filter by unit, industry, type, plus search) |
| Industries and ESG | `/industries`, `/sustainability` |
| News | `/insights`, `/insights/[slug]` (Markdown articles, sharing, Article schema) |
| Lead generation | `/contact` (general, consultation, RFQ, partnership, careers), `/request-quotation`, unit forms on every unit page |
| Legal and system | `/privacy`, `/thank-you`, `/sitemap.xml`, `/robots.txt`, custom 404 |
| CMS | `/admin` |

## Project structure

```
content/            All editable content (JSON and Markdown). This is what the CMS edits.
  settings/         site.json (contacts, homepage), company.json, partners.json, industries.json
  units/            one JSON file per business division / capability page
  projects/         one JSON file per project case study
  vehicles/         EV catalogue entries
  leadership/       leadership profiles
  insights/         news articles (Markdown with front matter)
public/images/      optimised photography and brand assets (uploads go to /images/uploads)
public/video/       compressed background and showcase videos
public/admin/       Decap CMS (index.html + config.yml)
src/app/            pages, API routes (enquiry, CMS OAuth), sitemap, robots
src/components/     reusable UI components
src/lib/            content loaders, form definitions, SEO helpers
docs/               deployment, CMS guide and content verification flags
```

## Enquiry handling

`POST /api/enquiry` handles every form. It validates input (zod), sanitises text, checks file type, size and file signature, applies a honeypot, a minimum-completion-time trap, per-IP rate limiting and optional Cloudflare Turnstile, generates a reference number (e.g. `DMX-261110-9E0514`), routes the enquiry to the business-division address set in environment variables, emails it with attachments, sends the enquirer an acknowledgement, and records it via webhook and/or a JSONL log. Forms also work without JavaScript (server redirect to `/thank-you`).

See `docs/DEPLOYMENT.md` for hosting and `docs/CMS-GUIDE.md` for staff editing. **Read `docs/CONTENT-FLAGS.md` before going live**: it lists every item that needs confirmation from Donmac management.
