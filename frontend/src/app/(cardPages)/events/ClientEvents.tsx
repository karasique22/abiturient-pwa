'use client';

import { useState } from 'react';
import { useFilter } from '@/hooks/useFilter';

import SearchInput from '@/components/ui/SearchInput/SearchInput';
import ViewSwitcher from '@/components/ui/ViewSwitcher/ViewSwitcher';
import FilterChips from '@/components/ui/FilterChips/FilterChips';
import ItemsGrid from '@/components/ui/ItemsGrid/ItemsGrid';

import { EventCategory } from '@/shared/prismaEnums';
import { eventLabels } from '@/shared/enumLabels';

import styles from '../cardPages.module.css';

import type { EventApi, ItemApi } from '@/types';

interface Props {
  events: EventApi[];
}

export default function ClientEvents({ events }: Props) {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const filtered = useFilter(events, categories, search);

  const items: ItemApi[] = filtered.map((e) => ({
    id: e.id,
    slug: e.slug,
    title: e.title,
    startDate: e.dateTime,
    coverUrl: (e as any).coverUrl || null,
    type: 'event',
    category: e.category,
  }));

  return (
    <>
      <div className='container'>
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <div className={styles.eventsContainer}>
        <header className={styles.eventsHeader}>
          <h2 className='font-header-medium'>Список событий</h2>
          <ViewSwitcher viewMode={view} onViewChange={setView} />
        </header>

        <div style={{ marginTop: '20px' }}>
          <FilterChips<EventCategory>
            selected={categories}
            onChange={setCategories}
            options={Object.values(EventCategory)}
            labels={eventLabels}
          />
        </div>

        <ItemsGrid items={items} viewMode={view} type='event' />
      </div>
    </>
  );
}
