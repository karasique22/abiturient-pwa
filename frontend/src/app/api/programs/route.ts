import { NextResponse } from 'next/server';

export async function GET() {
  const nest = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/programs`, {
    credentials: 'include',
  });

  const body = await nest.json();
  const res = NextResponse.json(body, { status: nest.status });

  return res;
}
