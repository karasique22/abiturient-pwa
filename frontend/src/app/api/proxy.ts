// app/api/proxy.ts (Edge/Route Handler)

import { NextResponse } from 'next/server';
import { cookies as nextCookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function proxy(req: Request, target: string) {
  const init: RequestInit = {
    method: req.method,
    headers: {},
    credentials: 'include',
  };

  const ct = req.headers.get('content-type');
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (ct?.includes('application/json')) {
      init.body = JSON.stringify(await req.json());
      (init.headers as any)['Content-Type'] = 'application/json';
    } else {
      const body = await req.text();
      if (body) init.body = body;
      if (ct) (init.headers as any)['Content-Type'] = ct;
    }
  }

  const cookies = await nextCookies();
  const access = cookies.get('accessToken')?.value;
  if (access) (init.headers as any).authorization = `Bearer ${access}`;

  const nestResp = await fetch(target, init);

  const res = new NextResponse(nestResp.body, { status: nestResp.status });

  const setCookie = nestResp.headers.get('set-cookie');
  if (setCookie) res.headers.set('set-cookie', setCookie);

  return res;
}
