import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMe } from '@/lib/getMe';
import AuthForm from '../AuthForm';

export default async function AuthPage(props: {
  params: Promise<{ mode: string }>;
}) {
  const params = await props.params;
  const { mode } = params;

  const access = (await cookies()).get('accessToken')?.value;
  if (access) redirect('/account');

  const me = await getMe({ headers: { Authorization: `Bearer ${access}` } });
  if (me) redirect('/account');

  if (mode !== 'login' && mode !== 'register') notFound();

  return <AuthForm mode={mode as 'login' | 'register'} />;
}
