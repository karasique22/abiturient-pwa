'use client';

import Image from 'next/image';
import { ProgramDocument, ProgramFormat, ProgramLevel } from '@prisma/client';
import { useState } from 'react';

import type { ProgramApi } from '@/types';
import AccordionBlock from '@/components/ui/AccordionBlock/AccordionBlock';
import LinkIcon from '@/components/icons/LinkIcon/LinkIcon';
import SignUpModal from '@/components/ui/SignUpModal/SignUpModal';
import api from '@/lib/api';
import styles from './Details.module.css';

export default function ProgramDetails({
  data,
  onBack,
}: {
  data: ProgramApi;
  onBack: () => void;
}) {
  // FIXME: вынести отсюда чтоле
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      await api.post('/applications', { programId: data.id });
    } finally {
      setOpen(false);
    }
  };

  const levelLabels: Record<ProgramLevel, string> = {
    [ProgramLevel.BEGINNER]: 'Начальный',
    [ProgramLevel.INTERMEDIATE]: 'Средний',
    [ProgramLevel.ADVANCED]: 'Продвинутый',
  };

  const documentLabels: Record<ProgramDocument, string> = {
    [ProgramDocument.DIPLOMA_PROFESSIONAL_RETRAINING]:
      'Диплом о профессиональной переподготовке',
    [ProgramDocument.DIPLOMA_PROFESSIONAL_DEVELOPMENT]:
      'Диплом о повышении квалификации=',
    [ProgramDocument.CERTIFICATE_OF_COMPLETION]: 'Сертификат об обучении',
  };

  const formatLabels: Record<ProgramFormat, string> = {
    [ProgramFormat.OFFLINE]: 'очный',
    [ProgramFormat.ONLINE]: 'онлайн',
  };

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
