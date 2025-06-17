'use client';

import Link from 'next/link';
import { ApplicationApi } from '@/types';
import {
  eventLabels,
  programCategoryLabel,
  applicationStatusLabel,
} from '@/shared/enumLabels';
import { EventCategory, ProgramCategory } from '@/shared/prismaEnums';
import styles from './ApplicationCard.module.css';

interface Props {
  application: ApplicationApi;
  onCancel: (id: string, title: string) => void;
}

export default function ApplicationCard({ application, onCancel }: Props) {
  const type = application.event ? 'event' : 'program';
  const item = application.event ?? application.program;

  if (!item) return null;

  return (
    <div className={styles.card}>
      <div className={`${styles.content} font-body-regular-small`}>
        {type === 'event' && 'address' in item && (
          <>
            <div className={styles.address}>{item.address}</div>
            <div>{new Date(item.dateTime).toLocaleDateString('ru-RU')}</div>
          </>
        )}
        {type === 'program' && (
          <div
            className={`${styles.statusBar} ${
              application.status === 'NEW'
                ? styles.statusNew
                : styles.statusApproved
            }`}
          >
            {applicationStatusLabel[application.status]}
          </div>
        )}
        <div className={`${styles.titleBlock} font-body-regular`}>
          <div>
            {type === 'event'
              ? eventLabels[item.category as EventCategory]
              : programCategoryLabel[item.category as ProgramCategory]}
          </div>
          <div>{item.title}</div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          className={`${styles.button} button-small button-secondary`}
          onClick={() => onCancel(application.id, item.title)}
        >
          Отменить заявку
        </button>
        <Link
          className={`${styles.button} button-small`}
          href={`/details/${type}/${item.slug}`}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}
