'use client';

import { EventCategory } from '@/shared/prismaEnums';
import { eventLabels as labels } from '@/shared/enumLabels';
import styles from './FilterChips.module.css';

// TODO: декомпозировать

interface Props {
  selected: EventCategory[];
  onChange: (next: EventCategory[]) => void;
}

export default function FilterChips({ selected, onChange }: Props) {
  const handleClick = (cat: EventCategory) => {
    onChange(
      selected.includes(cat)
        ? selected.filter((c) => c !== cat)
        : [...selected, cat]
    );
  };

  return (
    <div className={styles.filterChips}>
      {Object.values(EventCategory).map((cat) => (
        <button
          key={cat}
          className={`${styles.filterChip} ${
            selected.includes(cat) ? styles.active : ''
          }`}
          onClick={() => handleClick(cat)}
        >
          {labels[cat]}
        </button>
      ))}
    </div>
  );
}
