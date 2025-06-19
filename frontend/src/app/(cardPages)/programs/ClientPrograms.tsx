'use client';

import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';

import SearchInput from '@/components/ui/SearchInput/SearchInput';
import ItemsGrid from '@/components/ui/ItemsGrid/ItemsGrid';
import Loader from '@/components/Loader/Loader';
import FilterChips from '@/components/ui/FilterChips/FilterChips';

import type { ProgramApi, ItemApi } from '@/types';
import styles from '../cardPages.module.css';
import SortIcon from '@/components/icons/SortIcon';
import { useFilter } from '@/hooks/useFilter';
import { ProgramCategory } from '@/shared/prismaEnums';
import { programCategoryLabel } from '@/shared/enumLabels';

export default function ClientPrograms() {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<ProgramCategory[]>([]);
  const { data, loading, error } = useFetch<ProgramApi[]>('/programs');

  const programs = data || [];
  const filtered = useFilter(programs, categories, search);

  const items: ItemApi[] = filtered.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    startDate: p.startDate,
    coverUrl: p.coverUrl,
    type: 'program',
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

        {loading && <Loader />}
        {!loading && !error && <ItemsGrid items={items} viewMode={'list'} />}
      </div>
    </>
  );
}
