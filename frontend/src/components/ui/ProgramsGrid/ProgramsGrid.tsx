'use client';

import type { Program } from '@prisma/client';
import ProgramCard from '@/components/ui/ProgramCard/ProgramCard';
import styles from './ProgramsGrid.module.css';

interface Props {
  programs: Program[];
  viewMode: 'grid' | 'list';
}

export default function ProgramsGrid({ programs, viewMode }: Props) {
  if (!programs.length) return <p>На текущий момент программы отсутствуют.</p>;

  return (
    <div
      className={`${styles.programs} ${
        viewMode === 'grid' ? styles.programsGrid : styles.programsList
      }`}
    >
      {programs.map((p) => (
        <ProgramCard key={p.id} program={p} viewMode={viewMode} />
      ))}
    </div>
  );
}
