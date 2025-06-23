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
      d.description && { label: 'Описание', value: d.description },

      {
        accordion: true as const,
        title: 'Сведения',
        items: [
          d.level ? `Уровень: ${level[d.level]}` : null,
          d.durationYears
            ? `Продолжительность: ${d.durationYears} недель`
            : null,
          d.format ? `Формат: ${format[d.format]}` : null,
          d.document ? `Документ: ${doc[d.document]}` : null,
          d.startDate
            ? `Старт: ${new Date(d.startDate).toLocaleDateString('ru-RU')}`
            : null,
        ].filter(Boolean) as (string | null)[],
      },

      Array.isArray(d.content) &&
        (d.content as unknown[]).every((x) => typeof x === 'string') && {
          accordion: true as const,
          title: 'Содержание программы',
          items: d.content as string[],
        },

      d.curatorName && {
        label: 'Куратор программы',
        value: d.curatorName,
        extra: d.curatorInfo ?? undefined,
      },
    ].filter(Boolean) as (
      | { label: string; value?: string; extra?: string }
      | { accordion: true; title: string; items: (string | null | undefined)[] }
    )[],
} as const;
