import { useState } from 'react';

import styles from './FilterChips.module.css';

const filters = [
  { label: 'Мастер-класс', value: 'master-class' },
  { label: 'Пробное занятие', value: 'trial' },
  { label: 'Онлайн-курсы', value: 'courses' },
];

export default function FilterChips() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className={styles.filterChips}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`${styles.filterChip} ${
            selectedFilters.includes(filter.value) ? `${styles.active}` : ''
          }`}
          onClick={() => toggleFilter(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
