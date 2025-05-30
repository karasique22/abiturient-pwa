'use client';
// FIXME: клиентский компонент

import { useState } from 'react';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import ViewSwitcher from '@/components/ui/ViewSwitcher/ViewSwitcher';
import FilterChips from '@/components/ui/FilterChips/FilterChips';

import styles from './app.module.css';

type Props = {};

const page = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

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
        <FilterChips />
      </div>
    </>
  );
};

export default page;
