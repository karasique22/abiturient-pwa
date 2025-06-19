'use client';

import { useState } from 'react';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import ItemsGrid from '@/components/ui/ItemsGrid/ItemsGrid';
import FilterChips from '@/components/ui/FilterChips/FilterChips';

import type { ProgramApi, ItemApi } from '@/types';
import styles from '../cardPages.module.css';
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
  const filtered = useFilter(programs, categories, search);

  const items: ItemApi[] = filtered.map((p) => ({
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
          <h2 className='font-header-medium'>Список программ</h2>
          <SortIcon></SortIcon>
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
