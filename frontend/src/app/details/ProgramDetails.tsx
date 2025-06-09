'use client';

import Image from 'next/image';
import styles from './Details.module.css';
import BackLinkIcon from '@/components/icons/backLinkIcon';

import type { ProgramApi } from '@/types';

export default function ProgramDetails({
  data,
  onBack,
}: {
  data: ProgramApi;
  onBack: () => void;
}) {
  return (
    <>
      <div className={`${styles.header} container`}>
        <button className={styles.backLink} onClick={onBack}>
          <BackLinkIcon />
        </button>
        <h2 className={styles.headerTitle}>{data.title}</h2>
      </div>
      <div className={styles.detailsContainer}>
        <Image
          className={styles.coverImage}
          src={data.coverUrl || '/placeholder-event-image.jpg'}
          alt={data.title}
          width={600}
          height={400}
        />
        <div className={styles.infoContainer}>
          <div className={styles.infoBlock}>
            <span className={`${styles.infoSpan} font-body-medium-bold`}>
              Описание
            </span>
            <div className='font-body-normal'>{data.description}</div>
          </div>

          <details className={styles.listBlock} open>
            <summary className={`${styles.infoSpan} font-body-medium-bold`}>
              Сведения
            </summary>
            <ul className='font-body-normal'>
              {data.level && <li>Уровень: {data.level}</li>}
              {data.durationWeeks && (
                <li>Продолжительность: {data.durationWeeks} недель</li>
              )}
              {data.format && <li>Формат: {data.format}</li>}
              {data.document && <li>Документ: {data.document}</li>}
              {data.startDate && (
                <li>
                  Старт: {new Date(data.startDate).toLocaleDateString('ru-RU')}
                </li>
              )}
            </ul>
          </details>

          {data.modules && (
            <details className={styles.infoBlock}>
              <summary className={`${styles.infoSpan} font-body-medium-bold`}>
                Содержание программы
              </summary>
              <ul className='font-body-normal'>
                {data.modules.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </details>
          )}

          {data.curatorName && (
            <div className={styles.infoBlock}>
              <span className={`${styles.infoSpan} font-body-medium-bold`}>
                Куратор
              </span>
              <div className='font-body-normal'>{data.curatorName}</div>
              <div className='font-body-normal'>{data.curatorInfo}</div>
            </div>
          )}
        </div>
        <button className='button-large'>Записаться</button>
      </div>
    </>
  );
}
