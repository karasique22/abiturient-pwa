'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './Details.module.css';

import type { EventApi } from '@/types';
import LinkIcon from '@/components/icons/LinkIcon/LinkIcon';
import SignUpModal from '@/components/ui/SignUpModal/SignUpModal';
import api from '@/lib/api';

interface Props {
  data: EventApi;
  loading: boolean;
  error: unknown;
  onBack: () => void;
}

export default function EventDetails({ data, loading, error, onBack }: Props) {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    await api.post('/applications', { eventId: data.id });
  };

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
        <button className='button-large' onClick={() => setOpen(true)}>
          Записаться
        </button>
        <SignUpModal
          open={open}
          title={data.title}
          onConfirm={handleConfirm}
          onClose={() => setOpen(false)}
        />
      </div>
    </>
  );
}
