import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function proxy(req: Request, targetUrl: string) {
  const init: RequestInit = {
    method: req.method,
    credentials: 'include',
    headers: {},
  };

  const contentType = req.headers.get('content-type');
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (contentType?.includes('application/json')) {
      const json = await req.json();
      (init.headers as Record<string, string>)['Content-Type'] = 'application/json';
      init.body = JSON.stringify(json);
    } else {
      const text = await req.text();
      if (text) {
        init.body = text;
      }
      if (contentType) {
        (init.headers as Record<string, string>)['Content-Type'] = contentType;
      }
    }
  }

  const access = cookies().get('accessToken')?.value;
  if (access) {
    (init.headers as Record<string, string>)['Authorization'] = `Bearer ${access}`;
  }

  const nest = await fetch(targetUrl, init);
  const data = await nest.json();
  const res = NextResponse.json(data, { status: nest.status });

  nest.headers.forEach((v, k) => {
    if (k.toLowerCase() === 'set-cookie') res.headers.append('set-cookie', v);
  });

  return res;
}
