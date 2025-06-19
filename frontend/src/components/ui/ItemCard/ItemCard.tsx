'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ItemCard.module.css';
import type { ItemApi, ProgramApi } from '@/types';
import { ProgramFormat } from '@/shared/prismaEnums';
import { programFormatLabel, programCategoryLabel } from '@/shared/enumLabels';

interface Props {
  item: ItemApi & {
    format?: ProgramFormat;
    durationHours?: number | null;
    category?: keyof typeof programCategoryLabel;
  };
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
        <div className={`${styles.badges} font-body-bold-small`}>
          {item.durationHours && (
            <span className={styles.badge}>{item.durationHours} ак. ч.</span>
          )}
          {item.format && (
            <span className={styles.badge}>
              {programFormatLabel[item.format]}
            </span>
          )}
        </div>

        <div className={styles.contentMain}>
          {item.category && (
            <p className='font-body-regular'>
              {programCategoryLabel[item.category]}
            </p>
          )}
          <h3 className={`${styles.title} font-body-medium`}>{item.title}</h3>
          {item.startDate && (
            <p className='font-body-regular'>
              Старт: {new Date(item.startDate).toLocaleDateString('ru-RU')}
            </p>
          )}
        </div>

        <Link
          className='button-small'
          href={`/details/${item.type}/${item.slug}`}
          scroll={false}
        >
          Подробнее
        </Link>
      </div>
    </article>
  );
}
