'use client';

import Image from 'next/image';
import styles from './Details.module.css';

import type { EventApi } from '@/types';
import LinkIcon from '@/components/icons/LinkIcon/LinkIcon';

export default function EventDetails({
  data,
  onBack,
}: {
  data: EventApi;
  onBack: () => void;
}) {
  return (
    <>
      <div className={`${styles.header} container`}>
        <button className={styles.backLink} onClick={onBack}>
          <LinkIcon direction='back' />
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
        <div className={styles.eventContainer}>
          <div className={styles.infoBlock}>
            <span className={`${styles.infoSpan} font-body-medium-bold`}>
              Описание
            </span>
            <div className='font-body-normal'>{data.description}</div>
          </div>

          {data.dateTime && (
            <div className={styles.infoBlock}>
              <span className={`${styles.infoSpan} font-body-medium-bold`}>
                Дата и время проведения
              </span>
              <div className='font-body-normal'>
                {new Date(data.dateTime).toLocaleString('ru-RU')}
              </div>
            </div>
          )}

          {data.address && (
            <div className={styles.infoBlock}>
              <span className={`${styles.infoSpan} font-body-medium-bold`}>
                Адрес
              </span>
              <div className='font-body-normal'>{data.address}</div>
            </div>
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
