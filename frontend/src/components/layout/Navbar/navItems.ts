import HomeIcon from '../../icons/footer/HomeIcon';
import ProgramsIcon from '../../icons/footer/ProgramsIcon';
import AccountIcon from '../../icons/footer/AccountIcon';

export type UserRole = 'student' | 'moderator' | 'admin' | null;

export const getNavItems = (role: UserRole) => [
  { id: 'home', label: 'Объявления', Icon: HomeIcon, href: '/' },
  { id: 'programs', label: 'Программы', Icon: ProgramsIcon, href: '/programs' },
  {
    id: 'account',
    label: 'Аккаунт',
    Icon: AccountIcon,
    href:
      role === 'student'
        ? '/student'
        : role === 'moderator'
        ? '/moderator'
        : role === 'admin'
        ? '/admin'
        : '/login',
  },
];
