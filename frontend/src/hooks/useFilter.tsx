import { useMemo } from 'react';
import type { EventApi } from '@/types';
import { EventCategory } from '@/shared/prismaEnums';

export function useFilter(
  events: EventApi[],
  categories: EventCategory[],
  search: string
): EventApi[] {
  return useMemo(() => {
    let list = events;

    // Фильтрация по категориям
    if (categories.length) {
      list = list.filter((e) =>
        categories.includes(e.category as EventCategory)
      );
    }

    // Фильтрация по строке поиска
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
      );
    }

    return list;
  }, [events, categories, search]);
}
