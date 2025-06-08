'use client';

import api from '@/lib/api';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import type { EventApi, ProgramApi } from '@/types';

import styles from './Details.module.css';
import BackLinkIcon from '@/components/icons/backLinkIcon';

export type DetailsType = 'event' | 'program';

export default function ClientDetails({ slug }: { slug: string }) {
  const [data, setData] = useState<EventApi | ProgramApi | null>(null);
  const [type, setType] = useState<DetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<EventApi>(`/events/${slug}`);
        setData(res.data);
        setType('event');
      } catch (e1) {
        try {
          const res = await api.get<ProgramApi>(`/programs/${slug}`);
          setData(res.data);
          setType('program');
        } catch (e2) {
          setError(e2);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);


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
          {type === 'event' && (
            <>
              <div className={styles.infoBlock}>
                <span className={`${styles.infoSpan} font-body-medium-bold`}>
                  Дата и время проведения
                </span>
                <div className='font-body-normal'>
                  {new Date((data as EventApi).dateTime).toLocaleString()}
                </div>
              </div>
              <div className={styles.infoBlock}>
                <span className={`${styles.infoSpan} font-body-medium-bold`}>
                  Адрес
                </span>
                <div className='font-body-normal'>{(data as EventApi).address}</div>
              </div>
              <div className={styles.infoBlock}>
                <span className={`${styles.infoSpan} font-body-medium-bold`}>
                  Куратор
                </span>
                <div className='font-body-normal'>{(data as EventApi).curatorName}</div>
                <div className='font-body-normal'>{(data as EventApi).curatorInfo}</div>
              </div>
            </>
          )}
          {type === 'program' && (
            <>
              {(data as ProgramApi).startDate && (
                <div className={styles.infoBlock}>
                  <span className={`${styles.infoSpan} font-body-medium-bold`}>
                    Старт
                  </span>
                  <div className='font-body-normal'>
                    {new Date((data as ProgramApi).startDate as any).toLocaleDateString('ru-RU')}
                  </div>
                </div>
              )}
              {(data as ProgramApi).durationWeeks && (
                <div className={styles.infoBlock}>
                  <span className={`${styles.infoSpan} font-body-medium-bold`}>
                    Длительность
                  </span>
                  <div className='font-body-normal'>
                    {(data as ProgramApi).durationWeeks} недель
                  </div>
                </div>
              )}
              {(data as ProgramApi).priceRub && (
                <div className={styles.infoBlock}>
                  <span className={`${styles.infoSpan} font-body-medium-bold`}>
                    Цена
                  </span>
                  <div className='font-body-normal'>
                    {(data as ProgramApi).priceRub.toString()}₽
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <button className='button-large'>Записаться</button>
      </div>
    </>
  );
}
