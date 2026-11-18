# Deployment and maintenance

## Recommended hosting: Vercel (simplest)

1. Create a private GitHub repository (e.g. `donmac/donmac-website`) and push this folder to the `main` branch.
2. Sign in to vercel.com with the company GitHub account, choose **Add New Project**, import the repository. Framework is detected automatically.
3. Under **Settings > Environment Variables**, add the values from `.env.example` (at minimum `NEXT_PUBLIC_SITE_URL`, the `SMTP_*` values and `ENQUIRY_TO_*` addresses). Set `ENQUIRY_LOG_DIR=off` on Vercel (its file system is temporary) and use `ENQUIRY_WEBHOOK_URL` for tracking.
4. Deploy. Then add the domain `www.donmacltd.com` under **Settings > Domains** and update DNS at your registrar as Vercel instructs (CNAME `www` to `cname.vercel-dns.com`, and redirect the apex domain). HTTPS certificates are issued automatically.

Netlify, Render or a Linux VPS (Node 20 + `npm run build && npm start` behind Nginx with Let's Encrypt) also work. On a VPS the JSONL enquiry log persists; back it up.

## Email (SMTP)

The site sends enquiries through your existing mailbox provider.

* **Microsoft 365**: `SMTP_HOST=smtp.office365.com`, `SMTP_PORT=587`, `SMTP_USER` = a licensed mailbox such as `website@donmacltd.com`. Authenticated SMTP must be enabled for that mailbox in the Microsoft 365 admin centre.
* **Google Workspace**: `SMTP_HOST=smtp.gmail.com`, port 587, an app password for the sending account.

Set `MAIL_FROM` to the same address and make sure SPF/DKIM for `donmacltd.com` include the provider.

## Spam protection

Create a free Cloudflare Turnstile widget for the domain and set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. The honeypot, timing trap and rate limit work without it.

## CMS login (Decap CMS on Vercel)

1. On GitHub: **Settings > Developer settings > OAuth Apps > New OAuth App**. Homepage URL `https://www.donmacltd.com`; Authorization callback URL `https://www.donmacltd.com/api/callback`.
2. Copy the Client ID and a new Client Secret into `GITHUB_OAUTH_CLIENT_ID` and `GITHUB_OAUTH_CLIENT_SECRET` on Vercel.
3. In `public/admin/config.yml` set `backend.repo` to the real repository and `base_url` to the live site URL.
4. Give each editor a GitHub account with **Write** access to the repository. Use GitHub branch protection and the CMS editorial workflow (drafts, review, publish) to control who publishes. Remove access by removing the collaborator.

Alternative on Netlify: change the backend to `git-gateway`, enable Netlify Identity and invite editors by email (no GitHub accounts needed).

## Analytics

Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=donmacltd.com` after creating a Plausible site (cookie-free, no consent banner required). Any other privacy-friendly tool can be added in `src/app/layout.tsx`.

## Security

* Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) are set in `next.config.mjs`. If you add third-party scripts, add their domains to the CSP.
* The admin area is protected by GitHub authentication; content changes are versioned in Git.
* Keep dependencies patched: run `npm outdated` and `npm audit` monthly and redeploy.

## Backups and recovery

* All content and images live in the Git repository; every edit is a commit, so any previous version can be restored.
* Keep a second copy of the repository (e.g. a scheduled mirror to another GitHub organisation or a weekly `git bundle` to company storage).
* Export the enquiry webhook destination (CRM or sheet) regularly.
* To roll back a bad deployment on Vercel, open **Deployments** and **Promote** the previous one.

## Performance checklist before launch

* Replace low-resolution photos listed in `docs/CONTENT-FLAGS.md` with originals of at least 1600 px width.
* Run Lighthouse (Chrome DevTools) on `/`, `/energy` and `/e-mobility` in mobile mode against the live URL; target 90+ in all four categories.
* Submit `https://www.donmacltd.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools, and create or update the Google Business Profile for the Northmead office.
