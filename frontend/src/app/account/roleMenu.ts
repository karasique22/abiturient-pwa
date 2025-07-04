export const roleMenu = {
  student: [
    { href: 'settings', label: 'Настройки профиля' },
    { href: 'programs', label: 'Мои заявки на обучение' },
    { href: 'events', label: 'Мои записи на мероприятия' },
    { href: 'faq', label: 'Вопросы-ответы' },
    { href: 'contacts', label: 'Контакты' },
    { href: 'license', label: 'Лицензия' },
  ],
  moderator: [
    { href: 'settings', label: 'Настройки профиля' },
    { href: 'programs', label: 'Заявки студентов на обучение' },
    { href: 'events', label: 'Записи студентов на мероприятия' },
  ],
  admin: [
    { href: 'users', label: 'Пользователи' },
    { href: 'logs', label: 'Логи' },
  ],
} as const;
