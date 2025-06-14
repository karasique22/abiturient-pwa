import { notFound } from 'next/navigation';
import AuthForm from '../AuthForm';

export default function AuthPage({ params }: { params: { mode: string } }) {
  const { mode } = params;

  if (mode !== 'login' && mode !== 'register') notFound();

  return <AuthForm mode={mode as 'login' | 'register'} />;
}
