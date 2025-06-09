'use client';

import ItemCard from '@/components/ui/ItemCard/ItemCard';
import styles from './ItemsGrid.module.css';
import type { ItemApi } from '@/types';

interface Props {
  items: ItemApi[];
  viewMode: 'grid' | 'list';
}

export default function ItemsGrid({ items, viewMode }: Props) {
  if (!items.length) return <p>пока что ничего нет</p>;

  return (
    <div
      className={`${styles.events} ${
        viewMode === 'grid' ? styles.eventsGrid : styles.eventsList
      }`}
    >
      {items.map((item) => (
        <ItemCard
          key={`${item.type}-${item.id}`}
          item={item}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}
