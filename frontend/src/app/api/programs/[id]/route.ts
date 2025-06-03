import { NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Params) {
  const nest = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/programs/${params.id}`,
    { credentials: 'include' }
  );

  const body = await nest.json();
  return NextResponse.json(body, { status: nest.status });
}
