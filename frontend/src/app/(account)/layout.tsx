'use client';
// FIXME: клиентский

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    router.push('/auth');
    await logout();
  }

  return (
    <>
      {children}
      <button onClick={handleLogout}>ВЫХОД</button>
    </>
  );
}
