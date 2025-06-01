import { NextResponse } from 'next/server';

export async function POST() {
  const nest = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/auth/logout`, {
    method: 'POST',
    credentials: 'include', // ← передаём cookie
  });

  const res = NextResponse.json(await nest.json(), { status: nest.status });

  // пробрасываем Set-Cookie (clearCookie) из Nest
  nest.headers.forEach((v, k) => {
    if (k.toLowerCase() === 'set-cookie') res.headers.append('set-cookie', v);
  });

  return res;
}
