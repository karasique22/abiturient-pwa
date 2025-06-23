import { useEffect, useRef } from 'react';
import { DurationSort } from '@/hooks/UseSort';
import CheckedIcon from './CheckIcon/CheckedIcon';
import UncheckedIcon from './CheckIcon/UncheckedIcon';
import styles from './SortMenu.module.css';

export interface HTMLElementRef {
  current: HTMLElement | null;
}

interface SortMenuProps {
  open: boolean;
  value: DurationSort;
  onChange: (v: DurationSort) => void;
  anchorRef: HTMLElementRef;
  onClose: () => void;
}

const options: { label: string; value: DurationSort }[] = [
  { label: 'Популярные', value: null },
  {
    label: 'По возрастанию количества академических часов',
    value: 'asc',
  },
  {
    label: 'По убыванию количества академических часов',
    value: 'desc',
  },
];

export default function SortMenu({
  open,
  value,
  onChange,
  anchorRef,
  onClose,
}: SortMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        anchorRef.current &&
        !anchorRef.current.contains(target)
      ) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return (
    <div className={styles.menu} ref={menuRef}>
      {options.map((opt) => (
        <div key={opt.label}>
          <button
            type='button'
            className={`${styles.item} ${
              value === opt.value ? styles.checked : ''
            }`}
            onClick={() => {
              onChange(opt.value);
              onClose();
            }}
          >
            <div className={styles.itemText}>{opt.label}</div>
            {value === opt.value ? <CheckedIcon /> : <UncheckedIcon />}
          </button>
        </div>
      ))}
    </div>
  );
}
