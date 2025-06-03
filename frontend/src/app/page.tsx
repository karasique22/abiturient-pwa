'use client';
// FIXME: клиентский компонент

import { useState } from 'react';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import ViewSwitcher from '@/components/ui/ViewSwitcher/ViewSwitcher';
import FilterChips from '@/components/ui/FilterChips/FilterChips';
import EventsGrid from '@/components/ui/EventsGrid/EventsGrid';
import { useEvents } from '../../hooks/UseEvents';
import type { Event } from '@prisma/client';

import styles from './app.module.css';

const page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const { events, loading, error } = useEvents();

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
        {/* TODO: loader */}
        {loading && <p>Загрузка...</p>}
        {/* TODO: вывести ошибку */}
        {!loading && !error && (
          <EventsGrid
            events={events as Event[]}
            viewMode={viewMode}
            // searchQuery={searchQuery}
            // onSearchChange={setSearchQuery}
          />
        )}
      </div>
    </>
  );
};

export default page;
