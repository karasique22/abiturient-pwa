'use client';

import { useFetch } from '@/hooks/useFetch';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import type { Event } from '@prisma/client';

import styles from './Details.module.css';
import BackLinkIcon from '@/components/icons/backLinkIcon';

export default function ClientEventDetails({ slug }: { slug: string }) {
  const { data, loading, error } = useFetch<Event, Event>(`/events/${slug}`);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {String(error)}</p>;
  if (!data) return notFound();

  // FIXME: реализовать как модульное окно чтобы можно было переходить назад без фетчинга
  return (
    <>
      <div className={`${styles.header} container`}>
        <Link href='/' className={styles.backLink}>
          <BackLinkIcon />
        </Link>
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
          <div className={styles.infoBlock}>
            <span className={`${styles.infoSpan} font-body-medium-bold`}>
              Дата и время проведения
            </span>
            <div className='font-body-normal'>
              {new Date(data.dateTime).toLocaleString()}
            </div>
          </div>
          <div className={styles.infoBlock}>
            <span className={`${styles.infoSpan} font-body-medium-bold`}>
              Адрес
            </span>
            <div className='font-body-normal'>{data.address}</div>
          </div>
          <div className={styles.infoBlock}>
            <span className={`${styles.infoSpan} font-body-medium-bold`}>
              Куратор
            </span>
            <div className='font-body-normal'>{data.curatorName}</div>
            <div className='font-body-normal'>{data.curatorInfo}</div>
          </div>
        </div>
        <button className='button-large'>Записаться</button>
      </div>
    </>
  );
}
