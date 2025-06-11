import { EventApi } from '@/types';

export const eventConfig = {
  cover: (d: EventApi) => d.coverUrl,
  title: (d: EventApi) => d.title,
  pickId: (d: EventApi) => ({ eventId: d.id }),

  sections: (d: EventApi) =>
    [
      { label: 'Описание', value: d.description },
      d.dateTime && {
        label: 'Дата и время проведения',
        value: new Date(d.dateTime).toLocaleString('ru-RU'),
      },
      d.address && { label: 'Адрес', value: d.address },
      d.curatorName && {
        label: 'Куратор',
        value: d.curatorName,
        extra: d.curatorInfo,
      },
    ].filter(Boolean),
} as const;
