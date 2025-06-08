'use client';

import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';

import SearchInput from '@/components/ui/SearchInput/SearchInput';
import ViewSwitcher from '@/components/ui/ViewSwitcher/ViewSwitcher';
import ProgramsGrid from '@/components/ui/ProgramsGrid/ProgramsGrid';

import type { ProgramApi } from '@/types';
import styles from '../app.module.css';

export default function ProgramsPage() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'list' | 'grid'>('list');
  const { data, loading, error } = useFetch<ProgramApi>('/programs');

  const programs = data || [];
  const filtered = programs.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <>
      <div className='container'>
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <div className={styles.eventsContainer}>
        <header className={styles.eventsHeader}>
          <h2>Список программ</h2>
          <ViewSwitcher viewMode={view} onViewChange={setView} />
        </header>

        {loading && <p>Загрузка…</p>}
        {!loading && !error && (
          <ProgramsGrid programs={filtered as ProgramApi[]} viewMode={view} />
        )}
      </div>
    </>
  );
}
