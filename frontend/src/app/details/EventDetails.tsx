'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import type { EventApi, ApplicationApi } from '@/types';
import LinkIcon from '@/components/icons/LinkIcon/LinkIcon';
import SignUpModal from '@/components/ui/Modals/SignUpModal/SignUpModal';
import CancelModal from '@/components/ui/Modals/CancelModal/CancelModal';
import api from '@/lib/api';
import styles from './Details.module.css';

/* ─────────────────────────────────────────────────────────── */

type EnrollState =
  | { state: 'unknown' }
  | { state: 'none' }
  | { state: 'active'; appId: string }
  | { state: 'cancelling' };

interface Props {
  data: EventApi;
  onBack: () => void;
}

export default function EventDetails({ data, onBack }: Props) {
  const [enroll, setEnroll] = useState<EnrollState>({ state: 'unknown' });
  const [modal, setModal] = useState<'signup' | 'cancel' | null>(null);

  /* ── 1. проверяем заявку ──────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const { data: apps } = await api.get<ApplicationApi[]>(
          '/applications/my'
        );
        const active = apps.find(
          (a) => a.eventId === data.id && a.status === 'NEW'
        );
        if (active) setEnroll({ state: 'active', appId: active.id });
        else setEnroll({ state: 'none' });
      } catch {
        setEnroll({ state: 'none' });
      }
    })();
  }, [data.id]);

  /* ── 2. операции ─────────────────────────────────────── */
  const createApplication = async () => {
    const { data: app } = await api.post<ApplicationApi>('/applications', {
      eventId: data.id,
    });
    setEnroll({ state: 'active', appId: app.id });
  };

  const cancelApplication = async () => {
    if (enroll.state !== 'active') return;
    setEnroll({ state: 'cancelling' });
    await api.patch(`/applications/${enroll.appId}/cancel`);
    setEnroll({ state: 'none' });
  };

  /* ── 3. кнопка ───────────────────────────────────────── */
  const button =
    enroll.state === 'unknown'
      ? { label: '...', disabled: true }
      : enroll.state === 'none'
      ? {
          label: 'Записаться',
          disabled: false,
          onClick: () => setModal('signup'),
        }
      : enroll.state === 'active'
      ? {
          label: 'Вы записаны',
          disabled: false,
          onClick: () => setModal('cancel'),
          className: 'button-secondary',
        }
      : { label: 'Отменяем…', disabled: true };

  /* ── 4. UI ───────────────────────────────────────────── */
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

        <button
          className={`button-large ${button.className ?? ''}`}
          disabled={button.disabled}
          onClick={button.onClick}
        >
          {button.label}
        </button>
      </div>

      {modal === 'signup' && (
        <SignUpModal
          open
          title={data.title}
          onConfirm={createApplication}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'cancel' && (
        <CancelModal
          open
          title={data.title}
          onConfirm={cancelApplication}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
