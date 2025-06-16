'use client';

import Link from 'next/link';
import { ApplicationApi } from '@/types';
import styles from './ApplicationCard.module.css';

interface Props {
  application: ApplicationApi;
}

export default function ApplicationCard({ application }: Props) {
  const type = application.event ? 'event' : 'program';
  const item = application.event ?? application.program;

  if (!item) return null;

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        {type === 'event' && 'address' in item && (
          <div className={styles.address}>{item.address}</div>
        )}
        {type === 'program' && (
          <div className={styles.status}>{application.status}</div>
        )}
        <div>{item.category}</div>
        <div>{item.title}</div>
      </div>
      <div className={styles.buttons}>
        <Link href={`details/${type}/${item.slug}`}>Подробнее</Link>
      </div>
    </div>
  );
}
