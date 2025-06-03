import { notFound } from 'next/navigation';
import AuthForm from '../AuthForm';

export default async function AuthPage({
  params,
}: {
  params: Promise<{ mode: string }>;
}) {
  const { mode } = await params;

  if (mode !== 'login' && mode !== 'register') notFound();

  return <AuthForm mode={mode as 'login' | 'register'} />;
}
