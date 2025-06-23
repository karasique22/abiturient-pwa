import { useMemo } from 'react';

export type DurationSort = 'asc' | 'desc' | null;

export function useSort<T extends { durationHours?: number | null }>(
  items: T[],
  order: DurationSort
): T[] {
  return useMemo(() => {
    if (!order) return items; // «как есть»
    return [...items].sort((a, b) => {
      const aDur = a.durationHours ?? 0;
      const bDur = b.durationHours ?? 0;
      return order === 'asc' ? aDur - bDur : bDur - aDur;
    });
  }, [items, order]);
}
