'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ItemCard.module.css';
import type { ItemApi } from '@/types';

interface Props {
  item: ItemApi;
  viewMode: 'grid' | 'list';
}

export default function ItemCard({ item, viewMode }: Props) {
  return (
    <article
      className={`${styles.card} ${
        viewMode === 'grid' ? styles.cardGrid : styles.cardList
      }`}
    >
      <Image
        className={styles.image}
        src={item.coverUrl || 'https://placehold.co/600x400'}
        width={600}
        height={400}
        alt='placeholder'
      />
      <div className={styles.content}>
        <div className={styles.contentMain}>
          <h3 className={`${styles.title} font-body-normal-bold`}>
            {item.title}
          </h3>
          {item.startDate && (
            <p className='font-body-normal'>
              Старт: {new Date(item.startDate).toLocaleDateString('ru-RU')}
            </p>
          )}
        </div>

        <Link
          className='button-small'
          href={`/details/${item.slug}?type=${item.type}`}
          scroll={false}
        >
          Записаться
        </Link>
      </div>
    </article>
  );
}
