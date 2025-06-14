// src/app/account/[role]/page.tsx
import { headers } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import AccountHome from '../AccountHome';
import { roleMenu } from '../roleMenu';

type Role = keyof typeof roleMenu;

interface Props {
  role: Role;
}

export default async function RolePage(props: { params: Promise<Props> }) {
  const { role } = (await Promise.resolve(await props.params)) as Props;

  if (!(role in roleMenu)) notFound();

  const cookieHeader = (await headers()).get('cookie') ?? '';

  const meRes = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_ORIGIN}/api/users/me`,
    {
      cache: 'no-store',
      credentials: 'include',
      headers: { cookie: cookieHeader },
    }
  );

  if (meRes.status === 401) redirect('/auth/login');

  let fullName = 'Пользователь';
  if (meRes.ok) {
    const { user } = (await meRes.json()) as { user?: { fullName?: string } };
    if (user?.fullName) fullName = user.fullName;
  }

  return <AccountHome fullName={fullName} menu={[...roleMenu[role]]} />;
}
