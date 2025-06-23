'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ItemCard.module.css';
import type { ItemApi, ProgramApi } from '@/types';
import { ProgramFormat } from '@/shared/prismaEnums';
import {
  programFormatLabel,
  programCategoryLabel,
  eventLabels,
} from '@/shared/enumLabels';

interface Props {
  item: ItemApi & {
    format?: ProgramFormat;
    durationHours?: number | null;
    category?: keyof typeof programCategoryLabel | keyof typeof eventLabels;
  };
  viewMode?: 'grid' | 'list';
  type: 'event' | 'program';
}

export default function ItemCard({ item, viewMode, type }: Props) {
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
        {type === 'program' && (
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
        )}

        <div className={styles.contentMain}>
          {item.category && type === 'program' && (
            <p className='font-body-regular'>
              {
                programCategoryLabel[
                  item.category as keyof typeof programCategoryLabel
                ]
              }
            </p>
          )}
          {item.category && type === 'event' && (
            <p className='font-body-regular'>
              {eventLabels[item.category as keyof typeof eventLabels]}
            </p>
          )}

          <h3 className={`${styles.title} font-body-medium`}>{item.title}</h3>
          {item.startDate && type === 'event' && (
            <p className='font-body-regular'>
              {new Date(item.startDate).toLocaleDateString('ru-RU')}
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
