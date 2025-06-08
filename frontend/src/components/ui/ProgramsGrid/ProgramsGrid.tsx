'use client';

import type { ProgramApi } from '@/types';
import ProgramCard from '@/components/ui/ProgramCard/ProgramCard';
import CardGrid from '../CardGrid/CardGrid';
import styles from './ProgramsGrid.module.css';

interface Props {
  programs: ProgramApi[];
  viewMode: 'grid' | 'list';
}

export default function ProgramsGrid({ programs, viewMode }: Props) {
  return (
    <CardGrid
      items={programs}
      viewMode={viewMode}
      className={styles.events}
      renderItem={(p) => <ProgramCard key={p.id} program={p} viewMode={viewMode} />}
    />
  );
}
