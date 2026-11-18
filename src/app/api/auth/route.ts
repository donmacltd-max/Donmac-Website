import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

/** Starts GitHub OAuth for Decap CMS. Requires GITHUB_OAUTH_CLIENT_ID and GITHUB_OAUTH_CLIENT_SECRET. */
export function GET(req: Request) {
  const id = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!id) return new NextResponse('CMS authentication is not configured.', { status: 500 });
  const state = crypto.randomBytes(16).toString('hex');
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', id);
  url.searchParams.set('scope', process.env.GITHUB_OAUTH_SCOPE || 'repo,user');
  url.searchParams.set('state', state);
  url.searchParams.set('redirect_uri', new URL('/api/callback', req.url).toString());
  const res = NextResponse.redirect(url);
  res.cookies.set('decap_oauth_state', state, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 600, path: '/' });
  return res;
}
