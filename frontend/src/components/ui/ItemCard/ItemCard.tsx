'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ItemCard.module.css';
import type { EventApi, ProgramApi } from '@/types';

export type ItemType = 'event' | 'program';

interface Props {
  item: EventApi | ProgramApi;
  type: ItemType;
  viewMode: 'grid' | 'list';
}

export default function ItemCard({ item, type, viewMode }: Props) {
  const cover = (item as any).coverUrl || 'https://placehold.co/600x400';
  const linkHref = `/details/${item.slug}`;
  const buttonLabel = type === 'event' ? 'Записаться' : 'Подробнее';

  return (
    <article
      className={`${styles.card} ${viewMode === 'grid' ? styles.cardGrid : styles.cardList}`}
    >
      <Image className={styles.image} src={cover} width={600} height={400} alt='' />
      <div className={styles.content}>
        <div className={styles.contentMain}>
          <h3 className={`${styles.title} font-body-normal-bold`}>{item.title}</h3>
          {type === 'event' && (item as EventApi).dateTime && (
            <p className='font-body-normal'>
              Старт: {new Date((item as EventApi).dateTime).toLocaleDateString('ru-RU')}
            </p>
          )}
          {type === 'program' && (item as ProgramApi).startDate && (
            <p className='font-body-normal'>
              Старт: {new Date((item as ProgramApi).startDate as any).toLocaleDateString('ru-RU')}
            </p>
          )}
          {type === 'program' && (item as ProgramApi).durationWeeks && (
            <p className='font-body-normal'>
              Длительность: {(item as ProgramApi).durationWeeks} недель
            </p>
          )}
          {type === 'program' && (item as ProgramApi).priceRub && (
            <p className='font-body-normal'>Цена: {(item as ProgramApi).priceRub.toString()}₽</p>
          )}
        </div>
        <Link className='button-small' href={linkHref}>
          {buttonLabel}
        </Link>
      </div>
    </article>
  );
}
