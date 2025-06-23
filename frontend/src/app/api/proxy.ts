export const runtime = 'nodejs';

import { cookies as nextCookies } from 'next/headers';

export async function proxy(req: Request, target: string) {
  const init: RequestInit = {
    method: req.method,
    headers: {},
    credentials: 'include',
  };

  const ctype = req.headers.get('content-type');
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (ctype?.includes('application/json')) {
      init.body = JSON.stringify(await req.json());
      (init.headers as any)['Content-Type'] = 'application/json';
    } else {
      const txt = await req.text();
      if (txt) init.body = txt;
      if (ctype) (init.headers as any)['Content-Type'] = ctype;
    }
  }

  const cookies = await nextCookies();
  const access = cookies.get('accessToken')?.value;
  if (access) (init.headers as any).authorization = `Bearer ${access}`;

  const nest = await fetch(target, init);

  const resHeaders = new Headers(nest.headers); // включает Set-Cookie
  return new Response(nest.body, { status: nest.status, headers: resHeaders });
}
