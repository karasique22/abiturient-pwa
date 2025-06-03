import { NextResponse } from 'next/server';
// TODO: объединить с programs
export async function GET() {
  const nest = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/events`, {
    credentials: 'include',
  });

  const body = await nest.json();
  const res = NextResponse.json(body, { status: nest.status });

  return res;
}
