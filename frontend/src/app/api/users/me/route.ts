import { proxy } from '@/app/api/proxy';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const res = await proxy(req, `${process.env.NEXT_PUBLIC_BACKEND}/users/me`);

  if (!res.ok) {
    return res;
  }

  const user = await res.json();
  const role = user.roles?.[0]?.name ?? null;

  const next = NextResponse.json({ role, user }, { status: res.status });
  res.headers.forEach((v, k) => {
    if (k.toLowerCase() === 'set-cookie') next.headers.append('set-cookie', v);
  });

  return next;
}
