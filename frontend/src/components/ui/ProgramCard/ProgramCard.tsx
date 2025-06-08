'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../EventCard/EventCard.module.css';
import type { ProgramApi } from '@/types';

interface Props {
  program: ProgramApi;
  viewMode: 'grid' | 'list';
}

export default function ProgramCard({ program, viewMode }: Props) {
  return (
    <article
      className={`${styles.card} ${
        viewMode === 'grid' ? styles.cardGrid : styles.cardList
      }`}
    >
      <Image
        className={styles.image}
        src={program.coverUrl || 'https://placehold.co/600x400'}
        width={600}
        height={400}
        alt='placeholder'
      />
      <div className={styles.content}>
        <div className={styles.contentMain}>
          <h3 className={`${styles.title} font-body-normal-bold`}>
            {program.title}
          </h3>
          {program.startDate && (
            <p className='font-body-normal'>
              Старт: {new Date(program.startDate).toLocaleDateString('ru-RU')}
            </p>
          )}
        </div>

        <Link className='button-small' href={`/details/${program.slug}`}>
          Записаться
        </Link>
      </div>
    </article>
  );
}
