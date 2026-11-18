import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/** Completes GitHub OAuth and hands the token to the Decap CMS window. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const expected = cookies().get('decap_oauth_state')?.value;
  let status = 'error';
  let content: Record<string, string> = { error: 'Authentication failed' };
  if (code && state && expected && state === expected) {
    const r = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: process.env.GITHUB_OAUTH_CLIENT_ID, client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET, code }),
    }).then((x) => x.json()).catch(() => ({}));
    if (r.access_token) { status = 'success'; content = { token: r.access_token, provider: 'github' }; }
  }
  const msg = JSON.stringify(`authorization:github:${status}:${JSON.stringify(content)}`);
  const html = `<!doctype html><html><body><script>
  (function(){function r(e){window.opener.postMessage(${msg}, e.origin);window.removeEventListener('message',r,false);}
  window.addEventListener('message',r,false);window.opener.postMessage('authorizing:github','*');})();
  </script></body></html>`;
  const res = new NextResponse(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
  res.cookies.delete('decap_oauth_state');
  return res;
}
