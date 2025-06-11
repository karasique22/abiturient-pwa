'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ProgramLevel, ProgramFormat, ProgramDocument } from '@prisma/client';

import type { ProgramApi, ApplicationApi } from '@/types';
import AccordionBlock from '@/components/ui/AccordionBlock/AccordionBlock';
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
  data: ProgramApi;
  onBack: () => void;
}

export default function ProgramDetails({ data, onBack }: Props) {
  const [enroll, setEnroll] = useState<EnrollState>({ state: 'unknown' });
  const [modal, setModal] = useState<'signup' | 'cancel' | null>(null);

  /* ── 1. узнаём, записан ли пользователь ───────────────── */
  useEffect(() => {
    (async () => {
      try {
        const { data: apps } = await api.get<ApplicationApi[]>(
          '/applications/my'
        );
        const active = apps.find(
          (a) => a.programId === data.id && a.status === 'NEW'
        );
        if (active) setEnroll({ state: 'active', appId: active.id });
        else setEnroll({ state: 'none' });
      } catch {
        setEnroll({ state: 'none' });
      }
    })();
  }, [data.id]);

  /* ── 2. запросы ───────────────────────────────────────── */
  const createApplication = async () => {
    const { data: app } = await api.post<ApplicationApi>('/applications', {
      programId: data.id,
    });
    setEnroll({ state: 'active', appId: app.id });
  };

  const cancelApplication = async () => {
    if (enroll.state !== 'active') return;
    setEnroll({ state: 'cancelling' });
    await api.patch(`/applications/${enroll.appId}/cancel`);
    setEnroll({ state: 'none' });
  };

  /* ── 3. кнопка (текст, стиль, disabled, onClick) ──────── */
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

  /* ── 4. справочные лейблы ─────────────────────────────── */
  const levelLabels: Record<ProgramLevel, string> = {
    BEGINNER: 'Начальный',
    INTERMEDIATE: 'Средний',
    ADVANCED: 'Продвинутый',
  };

  const documentLabels: Record<ProgramDocument, string> = {
    DIPLOMA_PROFESSIONAL_RETRAINING: 'Диплом о проф. переподготовке',
    DIPLOMA_PROFESSIONAL_DEVELOPMENT: 'Диплом о повышении квалификации',
    CERTIFICATE_OF_COMPLETION: 'Сертификат об обучении',
  };

  const formatLabels: Record<ProgramFormat, string> = {
    OFFLINE: 'очный',
    ONLINE: 'онлайн',
  };

  /* ── 5. UI ─────────────────────────────────────────────── */
  return (
    <>
      <div className={`${styles.header} container`}>
        <button className={styles.backLink} onClick={onBack}>
          <LinkIcon direction='back' />
        </button>
        <h2 className={styles.headerTitle}>{data.title}</h2>
      </div>

      <div className={`${styles.detailsContainer} font-body-normal`}>
        <Image
          className={styles.coverImage}
          src={data.coverUrl || '/placeholder-event-image.jpg'}
          alt={data.title}
          width={600}
          height={400}
        />

        <div className={styles.programContainer}>
          <div className={styles.infoBlock}>
            <span className={`${styles.infoSpan} font-body-medium-bold`}>
              Описание
            </span>
            <div>{data.description}</div>
          </div>

          <AccordionBlock title='Сведения'>
            <ul className={styles.list}>
              {data.level && (
                <li className={styles.listItem}>
                  Уровень: {levelLabels[data.level as ProgramLevel]}
                </li>
              )}
              {data.durationYears && (
                <li className={styles.listItem}>
                  Продолжительность: {data.durationYears} недель
                </li>
              )}
              {data.format && (
                <li className={styles.listItem}>
                  Формат обучения: {formatLabels[data.format as ProgramFormat]}
                </li>
              )}
              {data.document && (
                <li className={styles.listItem}>
                  Документ: {documentLabels[data.document as ProgramDocument]}
                </li>
              )}
              {data.startDate && (
                <li className={styles.listItem}>
                  Старт: {new Date(data.startDate).toLocaleDateString('ru-RU')}
                </li>
              )}
            </ul>
          </AccordionBlock>

          {Array.isArray(data.content) &&
            (data.content as unknown[]).every(
              (el) => typeof el === 'string'
            ) && (
              <AccordionBlock title='Содержание программы'>
                <ul className={styles.list}>
                  {(data.content as string[]).map((m, i) => (
                    <li className={styles.listItem} key={i}>
                      {m}
                    </li>
                  ))}
                </ul>
              </AccordionBlock>
            )}

          <AccordionBlock title='Куратор программы'>
            <ul className={styles.list}>
              <li className={`${styles.listItem} font-body-normal-bold`}>
                {data.curatorName}
              </li>
              <li className={styles.listItem}>{data.curatorInfo}</li>
            </ul>
          </AccordionBlock>
        </div>

        <button
          className={`button-large ${button.className ?? ''}`}
          disabled={button.disabled}
          onClick={button.onClick}
        >
          {button.label}
        </button>
      </div>

      {/* модалки */}
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
