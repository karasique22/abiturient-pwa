'use client';

import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';

import SearchInput from '@/components/ui/SearchInput/SearchInput';
import ItemsGrid from '@/components/ui/ItemsGrid/ItemsGrid';

import type { ProgramApi, ItemApi } from '@/types';
import styles from '../app.module.css';

export default function ProgramsPage() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'list' | 'grid'>('list');
  const { data, loading, error } = useFetch<ProgramApi[]>('/programs');

  const programs = data || [];
  const filtered = programs.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

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
          <h2>Список программ</h2>
        </header>

        {loading && <p>Загрузка…</p>}
        {!loading && !error && <ItemsGrid items={items} viewMode={view} />}
      </div>
    </>
  );
}
