'use client';

import styles from './FilterChips.module.css';

interface Props<T extends string> {
  selected: T[];
  onChange: (next: T[]) => void;
  options: T[];
  labels: Record<T, string>;
}

export default function FilterChips<T extends string>({
  selected,
  onChange,
  options,
  labels,
}: Props<T>) {
  const handleClick = (cat: T) => {
    onChange(
      selected.includes(cat)
        ? selected.filter((c) => c !== cat)
        : [...selected, cat]
    );
  };

  return (
    <div className={styles.filterChips}>
      {options.map((cat) => (
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
