'use client';

import { EventCategory } from '@/shared/event-categories';
import styles from './FilterChips.module.css';

// TODO: декомпозировать

const labels: Record<EventCategory, string> = {
  [EventCategory.MASTER_CLASS]: 'Мастер-класс',
  [EventCategory.TRIAL]: 'Пробное занятие',
  [EventCategory.LESSON]: 'Онлайн-урок',
};

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
