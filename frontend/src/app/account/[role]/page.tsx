import { redirect, notFound } from 'next/navigation';
import AccountHome from '../AccountHome';
import { roleMenu } from '../roleMenu';
import { getMe } from '@/lib/getMe';

type Role = keyof typeof roleMenu;

export default async function RolePage(props: { params: { role: string } }) {
  const { role } = props.params;
  if (!(role in roleMenu)) notFound();

  const me = await getMe();
  if (!me) redirect('/auth/login');

  let fullName = 'Пользователь';
  if (me.user?.fullName) fullName = me.user.fullName;

  return <AccountHome fullName={fullName} menu={[...roleMenu[role as Role]]} />;
}
