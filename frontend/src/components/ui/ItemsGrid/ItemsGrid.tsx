'use client';

import CardGrid from '../CardGrid/CardGrid';
import ItemCard, { ItemType } from '../ItemCard/ItemCard';
import type { EventApi, ProgramApi } from '@/types';
import styles from './ItemsGrid.module.css';

interface Props {
  items: (EventApi | ProgramApi)[];
  viewMode: 'grid' | 'list';
  type: ItemType;
}

export default function ItemsGrid({ items, viewMode, type }: Props) {
  return (
    <CardGrid
      items={items}
      viewMode={viewMode}
      className={styles.events}
      renderItem={(item) => (
        <ItemCard key={item.id} item={item} type={type} viewMode={viewMode} />
      )}
    />
  );
}
