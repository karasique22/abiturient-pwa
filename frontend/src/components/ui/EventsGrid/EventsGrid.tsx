'use client';

import type { Event } from '@prisma/client';
import EventCard from '@/components/ui/EventCard/EventCard';
import styles from './EventsGrid.module.css';

interface Props {
  events: Event[];
  viewMode: 'grid' | 'list';
}

export default function EventsGrid({ events, viewMode }: Props) {
  if (!events.length) return <p>пока что событий нет</p>;

  return (
    <div
      className={`${styles.events} ${
        viewMode === 'grid' ? styles.eventsGrid : styles.eventsList
      }`}
    >
      {events.map((p) => (
        <EventCard key={p.id} event={p} viewMode={viewMode} />
      ))}
    </div>
  );
}
