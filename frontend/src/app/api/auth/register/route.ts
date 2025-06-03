import { NextResponse } from 'next/server';

// FIXME: чето с этим сделать

export async function POST(req: Request) {
  const body = await req.json();
  const nest = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  });

  const data = await nest.json();
  const res = NextResponse.json(data, { status: nest.status });

  nest.headers.forEach((v, k) => {
    if (k.toLowerCase() === 'set-cookie') res.headers.append('set-cookie', v);
  });

  return res;
}
