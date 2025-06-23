export const runtime = 'nodejs';

import { cookies as nextCookies } from 'next/headers';

export async function proxy(req: Request, target: string) {
  const init: RequestInit = { method: req.method, headers: {}, body: null };

  const ct = req.headers.get('content-type');
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (ct?.includes('application/json')) {
      init.body = JSON.stringify(await req.json());
      (init.headers as any)['Content-Type'] = 'application/json';
    } else {
      const txt = await req.text();
      if (txt) init.body = txt;
      if (ct) (init.headers as any)['Content-Type'] = ct;
    }
  }

  const cookies = await nextCookies();
  const access = cookies.get('accessToken')?.value;
  if (access) (init.headers as any).authorization = `Bearer ${access}`;

  const nest = await fetch(target, init);

  const headers = new Headers(nest.headers);
  const res = new Response(nest.body, { status: nest.status, headers });

  return res;
}
