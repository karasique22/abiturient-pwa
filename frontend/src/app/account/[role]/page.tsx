import { redirect, notFound } from 'next/navigation';
import AccountHome from '../AccountHome';
import { roleMenu } from '../roleMenu';

type Role = keyof typeof roleMenu;

export default async function RolePage({
  params,
}: {
  params: { role: string };
}) {
  const role = params.role as Role;
  if (!(role in roleMenu)) notFound();

  const meRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/users/me`, {
    cache: 'no-store',
    credentials: 'include',
  });

  if (meRes.status === 401) redirect('/auth/login');

  let fullName = 'Пользователь';
  if (meRes.ok) {
    const { user } = (await meRes.json()) as { user?: { fullName?: string } };
    if (user?.fullName) fullName = user.fullName;
  }

  return <AccountHome fullName={fullName} menu={[...roleMenu[role as Role]]} />;
}
