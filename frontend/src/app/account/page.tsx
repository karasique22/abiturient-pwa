import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMe } from '@/lib/getMe';

export default async function AccountRoot() {
  const access = (await cookies()).get('accessToken')?.value;
  if (!access) redirect('/auth/login');

  const me = await getMe({ headers: { Authorization: `Bearer ${access}` } });
  if (!me) redirect('/auth/login');

  const { roles } = me;
  const role = roles?.[0]?.name as
    | 'student'
    | 'moderator'
    | 'admin'
    | undefined;

  if (role) redirect(`/account/${role}`);
  redirect('/auth/login');
}
