import { useMemo } from 'react';

export function useFilter<
  T extends {
    category: string;
    title: string;
    format?: string;
    description?: string;
  }
>(items: T[], categories: string[], search: string, formats?: string[]): T[] {
  return useMemo(() => {
    let list = [...items];

    if (categories.length) {
      list = list.filter((item) => categories.includes(item.category));
    }

    if (formats?.length) {
      list = list.filter((item) => item.format && formats.includes(item.format));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [items, categories, formats, search]);
}
