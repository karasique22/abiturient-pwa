import HomeIcon from '../../icons/footer/HomeIcon';
import ProgramsIcon from '../../icons/footer/ProgramsIcon';
import AccountIcon from '../../icons/footer/AccountIcon';

export type UserRole = 'student' | 'moderator' | 'admin' | null;
export const getNavItems = (role: UserRole | undefined) => [
  { id: 'home', label: 'Мероприятия', Icon: HomeIcon, href: '/' },
  { id: 'programs', label: 'Обучение', Icon: ProgramsIcon, href: '/programs' },
  {
    id: 'account',
    label: 'Аккаунт',
    Icon: AccountIcon,
    href: role === undefined ? '/auth' : '/account',
  },
];
