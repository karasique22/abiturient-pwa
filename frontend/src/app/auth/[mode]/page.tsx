import { notFound } from 'next/navigation';
import AuthForm from '../AuthForm';

export default async function AuthPage(props: { params: Promise<{ mode: string }> }) {
  const params = await props.params;
  const { mode } = params;

  if (mode !== 'login' && mode !== 'register') notFound();

  return <AuthForm mode={mode as 'login' | 'register'} />;
}
