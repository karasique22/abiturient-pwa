'use client';

import React from 'react';
import styles from './CardGrid.module.css';

export interface CardGridProps<T> {
  items: T[];
  viewMode: 'grid' | 'list';
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export default function CardGrid<T>({
  items,
  viewMode,
  renderItem,
  className,
}: CardGridProps<T>) {
  if (!items.length) return <p>пока что данных нет</p>;

  return (
    <div
      className={`${styles.grid} ${
        viewMode === 'grid' ? styles.gridView : styles.listView
      } ${className ?? ''}`}
    >
      {items.map((item, idx) => (
        <React.Fragment key={idx}>{renderItem(item, idx)}</React.Fragment>
      ))}
    </div>
  );
}
