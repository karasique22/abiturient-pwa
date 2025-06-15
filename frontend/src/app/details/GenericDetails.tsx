'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import SignUpModal from '@/components/ui/Modals/SignUpModal/SignUpModal';
import CancelModal from '@/components/ui/Modals/CancelModal/CancelModal';
import AccordionBlock from '@/components/ui/AccordionBlock/AccordionBlock';
import api from '@/lib/api';

import styles from './Details.module.css';

import { eventConfig } from './event-details.config';
import { programConfig } from './program-details.config';
import { apiPublic } from '@/lib/apiPublic';
import { getMe } from '@/lib/getMe';
import PageBackHeader from '@/components/ui/PageBackHeader/PageBackHeader';

type DetailsConfig<T> = {
  cover: (d: T) => string | null | undefined;
  title: (d: T) => string;

  sections: (d: T) => (
    | { label: string; value?: string; extra?: string }
    | {
        accordion: true;
        title: string;
        items: (string | undefined | null)[];
      }
  )[];
  pickId: (d: T) => Record<string, string>;
};

interface Props<T = unknown> {
  type: 'event' | 'program';
  data: T;
}

export default function GenericDetails<T>({ type, data }: Props<T>) {
  const cfg: DetailsConfig<T> =
    type === 'event' ? (eventConfig as any) : (programConfig as any);

  const [guest, setGuest] = useState<boolean | null>(null);
  const [state, setState] = useState<
    'unknown' | 'none' | 'active' | 'cancelling'
  >('unknown');
  const [modal, setModal] = useState<'signup' | 'cancel' | null>(null);
  const [appId, setAppId] = useState<string>();

  useEffect(() => {
    (async () => {
      const me = await getMe();
      if (!me) {
        // гость → кнопка "Записаться"
        setGuest(true);
        setState('none');
        return;
      }

      /* ШАГ 2. я залогинен → смотрим заявки */
      setGuest(false);
      const { data: apps } = await apiPublic.get('/applications/my');
      const sel = cfg.pickId(data);

      const active = apps.find(
        (a: any) =>
          a.status === 'NEW' &&
          Object.entries(sel).every(([k, v]) => a[k] === v)
      );

      active ? (setState('active'), setAppId(active.id)) : setState('none');
    })();
  }, [data]);

  const create = async () => {
    const { data: app } = await api.post('/applications', cfg.pickId(data));
    setAppId(app.id);
    setState('active');
  };
  const cancel = async () => {
    if (!appId) return;
    setState('cancelling');
    await api.patch(`/applications/${appId}/cancel`);
    setState('none');
  };

  const btn =
    state === 'unknown'
      ? { txt: '…', dis: true }
      : state === 'none'
      ? { txt: 'Записаться', dis: false, click: () => setModal('signup') }
      : {
          txt: 'Вы записаны',
          dis: state === 'cancelling',
          cls: 'button-secondary',
          click: state === 'active' ? () => setModal('cancel') : undefined,
        };

  return (
    <>
      <PageBackHeader headerTitle={cfg.title(data)} />

      <div
        className={` container background-container ${
          styles.detailsContainer
        } ${type === 'program' ? 'font-body-regular' : ''}`}
      >
        <Image
          className={styles.coverImage}
          src={cfg.cover(data) || '/placeholder-event-image.jpg'}
          alt={cfg.title(data)}
          width={600}
          height={400}
        />

        <div
          className={
            type === 'program' ? styles.programContainer : styles.eventContainer
          }
        >
          {cfg.sections(data).map((s, idx) =>
            'accordion' in s ? (
              <AccordionBlock title={s.title} key={s.title}>
                <ul className={styles.list}>
                  {s.items.filter(Boolean).map((item, i) => (
                    <li className={styles.listItem} key={i}>
                      {item}
                    </li>
                  ))}
                </ul>
              </AccordionBlock>
            ) : s.value ? (
              <div key={s.label} className={styles.infoBlock}>
                <span className={`${styles.infoSpan} font-body-medium`}>
                  {s.label}
                </span>
                <div className='font-body-regular'>{s.value}</div>
                {s.extra && <div className='font-body-regular'>{s.extra}</div>}
              </div>
            ) : null
          )}
        </div>

        <button
          className={`button-large ${btn.cls ?? ''}`}
          disabled={btn.dis}
          onClick={btn.click}
        >
          {btn.txt}
        </button>
      </div>

      {modal === 'signup' && (
        <SignUpModal
          open
          title={cfg.title(data)}
          onConfirm={create}
          onClose={() => setModal(null)}
          needAuth={guest ?? true}
        />
      )}

      {modal === 'cancel' && (
        <CancelModal
          open
          title={cfg.title(data)}
          onConfirm={cancel}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
