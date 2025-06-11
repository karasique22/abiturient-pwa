'use client';

import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { useFilter } from '@/hooks/useFilter';

import SearchInput from '@/components/ui/SearchInput/SearchInput';
import ViewSwitcher from '@/components/ui/ViewSwitcher/ViewSwitcher';
import FilterChips from '@/components/ui/FilterChips/FilterChips';
import ItemsGrid from '@/components/ui/ItemsGrid/ItemsGrid';
import Loader from '@/components/Loader/Loader';

import type { EventApi, ItemApi } from '@/types';
import { EventCategory } from '@/shared/event-categories';

import styles from '../cardPages.module.css';

export default function ClientEvents() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const { data, loading, error } = useFetch<EventApi[]>('/events');

  const events = data || [];
  const filtered = useFilter(events, categories, search);

  const items: ItemApi[] = filtered.map((e) => ({
    id: e.id,
    slug: e.slug,
    title: e.title,
    startDate: e.dateTime,
    coverUrl: (e as any).coverUrl || null,
    type: 'event',
  }));

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

        {loading && <Loader />}
        {!loading && !error && <ItemsGrid items={items} viewMode={view} />}
      </div>
    </>
  );
}
