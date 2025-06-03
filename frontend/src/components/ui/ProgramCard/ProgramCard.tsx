'use client';

import React from 'react';
import Image from 'next/image';
import type { Program } from '@prisma/client';
import styles from './ProgramCard.module.css';

interface Props {
  program: Program;
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
        src={'https://placehold.co/600x400'}
        width={600}
        height={400}
        alt='placeholder'
      />
      <div className={styles.content}>
        <div className={styles.contentMain}>
          <h3 className='font-body-normal-bold'>{program.title}</h3>
          {program.startDate && (
            <p className='font-body-normal'>
              Старт: {new Date(program.startDate).toLocaleDateString('ru-RU')}
            </p>
          )}
        </div>

        {/* TODO: функционал кнопки */}
        <button className='button-small'>Записаться</button>
      </div>
    </article>
  );
}
