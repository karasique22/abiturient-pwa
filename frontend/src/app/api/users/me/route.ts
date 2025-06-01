import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const access = (await cookies()).get('accessToken')?.value;
  if (!access) return NextResponse.json({}, { status: 401 });

  const nestRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/me`, {
    headers: { Authorization: `Bearer ${access}` },
  });

  if (!nestRes.ok) {
    return NextResponse.json(await nestRes.json(), { status: nestRes.status });
  }

  const user = await nestRes.json();
  const role = user.roles?.[0]?.name ?? null; // <-- вытаскиваем строку

  // можно вернуть и весь профиль, если понадобится
  return NextResponse.json({ role, user });
}
