import { useMemo } from 'react';
import type { Event } from '@prisma/client';
import { EventCategory } from '@/shared/event-categories';

export function useFilter(
  events: Event[],
  categories: EventCategory[],
  search: string
): Event[] {
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
