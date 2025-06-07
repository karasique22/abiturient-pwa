'use client';
// FIXME: клиентский

import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';

import SearchInput from '@/components/ui/SearchInput/SearchInput';
import ViewSwitcher from '@/components/ui/ViewSwitcher/ViewSwitcher';
import FilterChips from '@/components/ui/FilterChips/FilterChips';
import EventsGrid from '@/components/ui/EventsGrid/EventsGrid';
import { useFilter } from '@/hooks/useFilter';

import type { Event } from '@prisma/client';
import { EventCategory } from '@/shared/event-categories';

import styles from './app.module.css';

export default function EventsPage() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const { data, loading, error } = useFetch<Event>('/events');

  const events = data || [];
  const filtered = useFilter(events, categories, search);

  return (
    <>
      <div className='container'>
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <div className={styles.eventsContainer}>
        <header className={styles.eventsHeader}>
          <h2>Список событий</h2>
          <ViewSwitcher viewMode={view} onViewChange={setView} />
        </header>

        <FilterChips selected={categories} onChange={setCategories} />

        {loading && <p>Загрузка…</p>}
        {/* TODO: */}
        {/* {error && <p>Ошибка загрузки</p>} */}

        {!loading && !error && (
          <EventsGrid events={filtered as Event[]} viewMode={view} />
        )}
      </div>
    </>
  );
}
