import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AccountRoot() {
  const access = (await cookies()).get('accessToken')?.value;
  if (!access) redirect('/auth/login');

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/me`, {
    headers: { Authorization: `Bearer ${access}` },
    cache: 'no-store',
  });
  if (!res.ok) redirect('/auth/login');

  const { roles } = await res.json();
  const role = roles?.[0]?.name as
    | 'student'
    | 'moderator'
    | 'admin'
    | undefined;

  if (role) redirect(`/account/${role}`);
  redirect('/auth/login');
}
