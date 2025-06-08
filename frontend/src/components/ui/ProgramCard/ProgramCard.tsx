'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProgramCard.module.css';
import type { ProgramApi } from '@/types';

interface Props {
  program: ProgramApi;
  viewMode: 'grid' | 'list';
}

export default function ProgramCard({ program, viewMode }: Props) {
  const cover = (program as any).coverUrl || 'https://placehold.co/600x400';

  return (
    <article
      className={`${styles.card} ${
        viewMode === 'grid' ? styles.cardGrid : styles.cardList
      }`}
    >
      <Image
        className={styles.image}
        src={cover}
        width={600}
        height={400}
        alt=''
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
          {program.durationWeeks && (
            <p className='font-body-normal'>
              Длительность: {program.durationWeeks} недель
            </p>
          )}
          {program.priceRub && (
            <p className='font-body-normal'>Цена: {program.priceRub.toString()} ₽</p>
          )}
        </div>
        <Link className='button-small' href={`/programs/${program.slug}`}>
          Подробнее
        </Link>
      </div>
    </article>
  );
}
