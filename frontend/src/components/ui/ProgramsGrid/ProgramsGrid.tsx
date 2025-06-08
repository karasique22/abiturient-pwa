'use client';

import ProgramCard from '@/components/ui/ProgramCard/ProgramCard';
import styles from '../EventsGrid/EventsGrid.module.css';
import type { ProgramApi } from '@/types';

interface Props {
  programs: ProgramApi[];
  viewMode: 'grid' | 'list';
}

export default function ProgramsGrid({ programs, viewMode }: Props) {
  if (!programs.length) return <p>пока что программ нет</p>;

  return (
    <div
      className={`${styles.events} ${
        viewMode === 'grid' ? styles.eventsGrid : styles.eventsList
      }`}
    >
      {programs.map((p) => (
        <ProgramCard key={p.id} program={p} viewMode={viewMode} />
      ))}
    </div>
  );
}
