'use client';
// FIXME: клиентский компонент

import { useState } from 'react';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import ViewSwitcher from '@/components/ui/ViewSwitcher/ViewSwitcher';
import FilterChips from '@/components/ui/FilterChips/FilterChips';
import ProgramsGrid from '@/components/ui/ProgramsGrid/ProgramsGrid';
import { usePrograms } from '../../hooks/UsePrograms';
import type { Program } from '@prisma/client';

import styles from './app.module.css';

const page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const { programs, loading, error } = usePrograms();

  return (
    <>
      <div className='container'>
        <SearchInput />
      </div>
      <div className={styles.eventsContainer}>
        <div className={styles.eventsHeader}>
          <h2>Список событий</h2>
          <ViewSwitcher viewMode={viewMode} onViewChange={setViewMode} />
        </div>
        {/* TODO: прокинуть фильтрацию */}
        <FilterChips />
        <div>
          {/* TODO: loader */}
          {loading && <p>Загрузка...</p>}
          {/* TODO: вывести ошибку */}
          {!loading && !error && (
            <ProgramsGrid
              programs={programs as Program[]}
              viewMode={viewMode}
              // searchQuery={searchQuery}
              // onSearchChange={setSearchQuery}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default page;
