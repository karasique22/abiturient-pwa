'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './EventCard.module.css';
import type { EventApi } from '@/types';

interface Props {
  event: EventApi;
  viewMode: 'grid' | 'list';
}

export default function EventCard({ event, viewMode }: Props) {
  return (
    <article
      className={`${styles.card} ${
        viewMode === 'grid' ? styles.cardGrid : styles.cardList
      }`}
    >
      <Image
        className={styles.image}
        src={`${event.coverUrl} ?? 'https://placehold.co/600x400'`}
        width={600}
        height={400}
        alt='placeholder'
      />
      <div className={styles.content}>
        <div className={styles.contentMain}>
          <h3 className={`${styles.title} font-body-normal-bold`}>
            {event.title}
          </h3>
          {event.dateTime && (
            <p className='font-body-normal'>
              Старт: {new Date(event.dateTime).toLocaleDateString('ru-RU')}
            </p>
          )}
        </div>

        <Link className='button-small' href={`/details/${event.slug}`}>
          Записаться
        </Link>
      </div>
    </article>
  );
}
