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
        <h1>Подробности о событии</h1>
        <p>Описание: {data.description}</p>
        <p>Дата: {new Date(data.dateTime).toLocaleString()}</p>
        <p>Место: {data.address}</p>
        <p>Куратор: {data.curatorName}</p>
      </div>
    </>
  );
}
