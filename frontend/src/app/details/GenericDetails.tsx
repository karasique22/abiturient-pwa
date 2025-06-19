'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import ApplyModal from '@/components/ui/Modals/ApplyModal/ApplyModal';
import CancelModal from '@/components/ui/Modals/CancelModal/CancelModal';
import AccordionBlock from '@/components/ui/AccordionBlock/AccordionBlock';
import PageBackHeader from '@/components/ui/PageBackHeader/PageBackHeader';

import { useApplications } from '@/hooks/useApplications';
import { useCurrentUser } from '@/hooks/useCurrentUser';

import styles from './Details.module.css';

type DetailsConfig<T> = {
  cover: (d: T) => string | null | undefined;
  title: (d: T) => string;
  sections: (
    d: T
  ) => (
    | { label: string; value?: string; extra?: string }
    | { accordion: true; title: string; items: (string | undefined | null)[] }
  )[];
  pickId: (d: T) => Record<string, string>;
};

interface Props<T = unknown> {
  data: T;
  config: DetailsConfig<T>;
  type: 'event' | 'program';
}

export default function GenericDetails<T>({ data, config, type }: Props<T>) {
  const cfg: DetailsConfig<T> = config;
  const { role, loading: userLoading } = useCurrentUser();

  const guest = !role && !userLoading;

  const {
    applications,
    mutate,
    createApplication,
    cancelApplication: cancelApplicationHook,
    mutating,
  } = useApplications(type === 'event' ? 'events' : 'programs', {
    skipAuthRefresh: guest,
  });

  const [state, setState] = useState<'unknown' | 'none' | 'active' | 'loading'>(
    'unknown'
  );
  const [modal, setModal] = useState<'signup' | 'cancel' | null>(null);
  const [appId, setAppId] = useState<string>();

  useEffect(() => {
    if (userLoading) return;

    if (guest) {
      setState('none');
      return;
    }

    const sel = cfg.pickId(data);
    const active = applications.find(
      (a: any) =>
        a.status === 'NEW' && Object.entries(sel).every(([k, v]) => a[k] === v)
    );

    active ? (setState('active'), setAppId(active.id)) : setState('none');
  }, [applications, data, guest, userLoading]);

  const create = async () => {
    const app = await createApplication(cfg.pickId(data));
    if (app) {
      setAppId(app.id);
      setState('active');
    }
  };

  const cancelApplication = async () => {
    if (!appId) return;
    setState('loading');
    await cancelApplicationHook(appId);
    setState('none');
  };

  const btn =
    state === 'unknown'
      ? { txt: '…', dis: true }
      : state === 'none'
      ? { txt: 'Записаться', dis: false, click: () => setModal('signup') }
      : {
          txt: 'Вы записаны',
          dis: mutating,
          cls: 'button-secondary',
          click: state === 'active' ? () => setModal('cancel') : undefined,
        };

  return (
    <>
      <PageBackHeader headerTitle={cfg.title(data)} />

      <div
        className={`container background-container ${styles.detailsContainer} ${
          type === 'program' ? 'font-body-regular' : ''
        }`}
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
          {cfg.sections(data).map((s) =>
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
        <ApplyModal
          open
          title={cfg.title(data)}
          onConfirm={create}
          onClose={() => setModal(null)}
          needAuth={guest}
        />
      )}

      {modal === 'cancel' && (
        <CancelModal
          open
          title={cfg.title(data)}
          onConfirm={cancelApplication}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
