import { headers } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import { getMe } from '@/lib/getMe';
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

  const me = await getMe({ headers: { cookie: cookieHeader } });
  if (!me) redirect('/auth/login');

  let fullName = me.user?.fullName ?? 'Пользователь';

  return (
    <AccountHome role={role} fullName={fullName} menu={[...roleMenu[role]]} />
  );
}
