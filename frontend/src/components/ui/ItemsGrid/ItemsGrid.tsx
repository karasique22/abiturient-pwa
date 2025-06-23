'use client';

import ItemCard from '@/components/ui/ItemCard/ItemCard';
import styles from './ItemsGrid.module.css';
import type { ItemApi } from '@/types';

interface Props {
  items: ItemApi[];
  viewMode?: 'grid' | 'list';
  type: 'event' | 'program';
}

export default function ItemsGrid({ items, viewMode = 'list', type }: Props) {
  if (!items.length)
    return <p className={styles.nothingFound}>Ничего не найдено :(</p>;

  return (
    <div
      className={`${styles.items} ${
        viewMode === 'grid' ? styles.itemsGrid : styles.itemsList
      }`}
    >
      {items.map((item) => (
        <ItemCard
          key={`${item.type}-${item.id}`}
          item={item}
          viewMode={viewMode}
          type={type}
        />
      ))}
    </div>
  );
}
