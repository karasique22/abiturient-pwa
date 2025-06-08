'use client';

import type { Event } from '@prisma/client';
import EventCard from '@/components/ui/EventCard/EventCard';
import CardGrid from '../CardGrid/CardGrid';
import styles from './EventsGrid.module.css';

interface Props {
  events: Event[];
  viewMode: 'grid' | 'list';
}

export default function EventsGrid({ events, viewMode }: Props) {
  return (
    <CardGrid
      items={events}
      viewMode={viewMode}
      className={styles.events}
      renderItem={(p) => <EventCard key={p.id} event={p} viewMode={viewMode} />}
    />
  );
}
