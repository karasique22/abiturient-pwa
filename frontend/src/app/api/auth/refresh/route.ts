import { NextResponse } from 'next/server';

export async function POST() {
  /* проксируем в Nest */
  const nest = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });

  const body = await nest.json();
  const res = NextResponse.json(body, { status: nest.status });

  /* пробрасываем Set-Cookie из Nest → браузеру */
  nest.headers.forEach((v, k) => {
    if (k.toLowerCase() === 'set-cookie') res.headers.append('set-cookie', v);
  });

  return res;
}
