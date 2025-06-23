'use client';

import { useState, useRef } from 'react';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import ItemsGrid from '@/components/ui/ItemsGrid/ItemsGrid';
import FilterChips from '@/components/ui/FilterChips/FilterChips';
import SortMenu from '@/components/ui/SortMenu/SortMenu';
import { DurationSort, useSort } from '@/hooks/UseSort';

import styles from '../cardPages.module.css';
import type { ProgramApi, ItemApi } from '@/types';
import SortIcon from '@/components/icons/SortIcon';
import { useFilter } from '@/hooks/useFilter';
import { ProgramCategory } from '@/shared/prismaEnums';
import { programCategoryLabel } from '@/shared/enumLabels';

interface Props {
  programs: ProgramApi[];
}

export default function ClientPrograms({ programs }: Props) {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<ProgramCategory[]>([]);
  const [sort, setSort] = useState<DurationSort>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const iconRef = useRef<HTMLButtonElement>(null);

  const filtered = useFilter(programs, categories, search);
  const sorted = useSort(filtered, sort);

  const items: ItemApi[] = sorted.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    startDate: p.startDate,
    coverUrl: p.coverUrl,
    type: 'program',
    format: p.format,
    durationHours: p.durationHours,
    category: p.category,
  }));

  return (
    <>
      <div className='container'>
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <div className={styles.eventsContainer}>
        <header className={styles.eventsHeader}>
          <h2 className='font-header-medium'>Образовательные программы</h2>
          <button
            ref={iconRef}
            className={styles.sortBtn}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label='Сортировка программ'
          >
            <SortIcon />
          </button>
          <SortMenu
            open={menuOpen}
            anchorRef={iconRef}
            value={sort}
            onChange={setSort}
            onClose={() => setMenuOpen(false)}
          />
        </header>

        <FilterChips<ProgramCategory>
          selected={categories}
          onChange={setCategories}
          options={Object.values(ProgramCategory)}
          labels={programCategoryLabel}
        />

        <ItemsGrid items={items} type='program' />
      </div>
    </>
  );
}
