import { ProgramApi } from '@/types';
import {
  programLevelLabel as level,
  programFormatLabel as format,
  programDocumentLabel as doc,
} from '@/shared/enumLabels';

export const programConfig = {
  cover: (d: ProgramApi) => d.coverUrl,
  title: (d: ProgramApi) => d.title,
  pickId: (d: ProgramApi) => ({ programId: d.id }),

  sections: (d: ProgramApi) =>
    [
      { label: 'Описание', value: d.description },

      {
        accordion: true,
        title: 'Сведения',
        items: [
          d.level && `Уровень: ${level[d.level]}`,
          d.durationYears && `Продолжительность: ${d.durationYears} недель`,
          d.format && `Формат: ${format[d.format]}`,
          d.document && `Документ: ${doc[d.document]}`,
          d.startDate &&
            `Старт: ${new Date(d.startDate).toLocaleDateString('ru-RU')}`,
        ],
      },

      Array.isArray(d.content) &&
        (d.content as unknown[]).every((x) => typeof x === 'string') && {
          accordion: true,
          title: 'Содержание программы',
          items: d.content as string[],
        },

      d.curatorName && {
        label: 'Куратор программы',
        value: d.curatorName,
        extra: d.curatorInfo,
      },
    ].filter(Boolean),
} as const;
