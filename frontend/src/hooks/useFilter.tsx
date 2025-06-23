import { useMemo } from 'react';

export function useFilter<
  T extends { category: string; title: string; description?: string }
>(items: T[], categories: string[], search: string): T[] {
  return useMemo(() => {
    let list = [...items];

    if (categories.length) {
      list = list.filter((item) => categories.includes(item.category));
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
  }, [items, categories, search]);
}
