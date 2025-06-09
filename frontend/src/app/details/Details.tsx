'use client';

import { useFetch } from '@/hooks/useFetch';
import { notFound, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { EventApi, ProgramApi } from '@/types';

import styles from './Details.module.css';
import BackLinkIcon from '@/components/icons/backLinkIcon';
import Loader from '@/components/Loader/Loader';

export default function ClientDetails({ slug }: { slug: string }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const type = searchParams.get('type') === 'program' ? 'program' : 'event';
  const { data, loading, error } = useFetch<EventApi | ProgramApi>(
    `/${type}s/${slug}`
  );

  if (loading) return <Loader />;
  if (error) return <p>Ошибка: {String(error)}</p>;
  if (!data) return notFound();

  // FIXME: реализовать как модульное окно чтобы можно было переходить назад без фетчинга
  return (
    <>
      <div className={`${styles.header} container`}>
        <button className={styles.backLink} onClick={() => router.back()}>
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
          {type === 'program' && (
            <details className={styles.infoBlock} open>
              <summary className={`${styles.infoSpan} font-body-medium-bold`}>
                Сведения
              </summary>
              <ul className='font-body-normal'>
                {(data as ProgramApi).level && (
                  <li>Уровень: {(data as ProgramApi).level}</li>
                )}
                {(data as ProgramApi).durationWeeks && (
                  <li>
                    Продолжительность: {(data as ProgramApi).durationWeeks}
                    недель
                  </li>
                )}
                {(data as ProgramApi).format && (
                  <li>Формат: {(data as ProgramApi).format}</li>
                )}
                {(data as ProgramApi).document && (
                  <li>Документ: {(data as ProgramApi).document}</li>
                )}
                {(data as ProgramApi).startDate && (
                  <li>
                    Старт:
                    {new Date(
                      (data as ProgramApi).startDate as string
                    ).toLocaleDateString('ru-RU')}
                  </li>
                )}
              </ul>
            </details>
          )}
          {type === 'program' && (data as ProgramApi).modules && (
            <details className={styles.infoBlock}>
              <summary className={`${styles.infoSpan} font-body-medium-bold`}>
                Содержание программы
              </summary>
              <ul className='font-body-normal'>
                {(data as ProgramApi).modules!.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </details>
          )}
          {(data as any).dateTime || (data as any).startDate ? (
            <div className={styles.infoBlock}>
              <span className={`${styles.infoSpan} font-body-medium-bold`}>
                Дата и время проведения
              </span>
              <div className='font-body-normal'>
                {new Date(
                  ((data as any).dateTime || (data as any).startDate) as string
                ).toLocaleString('ru-RU')}
              </div>
            </div>
          ) : null}
          {(data as any).address && (
            <div className={styles.infoBlock}>
              <span className={`${styles.infoSpan} font-body-medium-bold`}>
                Адрес
              </span>
              <div className='font-body-normal'>{(data as any).address}</div>
            </div>
          )}
          {(data as any).curatorName && (
            <div className={styles.infoBlock}>
              <span className={`${styles.infoSpan} font-body-medium-bold`}>
                Куратор
              </span>
              <div className='font-body-normal'>
                {(data as any).curatorName}
              </div>
              <div className='font-body-normal'>
                {(data as any).curatorInfo}
              </div>
            </div>
          )}
        </div>
        <button className='button-large'>Записаться</button>
      </div>
    </>
  );
}
