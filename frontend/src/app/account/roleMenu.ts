export const roleMenu = {
  student: [
    { href: 'settings', label: 'Настройки профиля' },
    { href: 'applications', label: 'Мои заявки' },
    { href: 'events', label: 'Мои записи' },
    { href: 'faq', label: 'Вопросы-ответы' },
    { href: 'contacts', label: 'Контакты' },
    { href: 'license', label: 'Лицензия' },
  ],
  moderator: [
    { href: 'applications', label: 'Заявки студентов' },
    { href: 'events', label: 'Записи на мероприятия' },
  ],
  admin: [
    { href: 'users', label: 'Пользователи' },
    { href: 'logs', label: 'Логи' },
  ],
} as const;
