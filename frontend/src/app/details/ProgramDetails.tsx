'use client';

import Image from 'next/image';
import styles from './Details.module.css';
import BackLinkIcon from '@/components/icons/BackLinkIcon';
import ToggleListIcon from '@/components/icons/ToggleListIcon';

import type { ProgramApi } from '@/types';
import { ProgramDocument, ProgramFormat, ProgramLevel } from '@prisma/client';

export default function ProgramDetails({
  data,
  onBack,
}: {
  data: ProgramApi;
  onBack: () => void;
}) {
  // FIXME: вынести отсюда чтоле
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
          <BackLinkIcon />
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

          <details className={styles.listBlock}>
            <summary className={`${styles.listSpan} font-body-normal-bold`}>
              <p>Сведения</p>
              <div className={styles.toggleIcon}>
                <ToggleListIcon />
              </div>
            </summary>
            <ul className={`${styles.list} font-body-normal`}>
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
          </details>

          {data.content && (
            <details className={styles.listBlock}>
              <summary className={`${styles.listSpan} font-body-normal-bold`}>
                <p>Содержание программы</p>
                <div className={styles.toggleIcon}>
                  <ToggleListIcon />
                </div>
              </summary>
              {Array.isArray(data.content) &&
                (data.content as unknown[]).every(
                  (el) => typeof el === 'string'
                ) && (
                  <ul className={`${styles.list} font-body-normal`}>
                    {(data.content as string[]).map((m, i) => (
                      <li className={styles.listItem} key={i}>
                        {m}
                      </li>
                    ))}
                  </ul>
                )}
            </details>
          )}

          <details className={styles.listBlock}>
            <summary className={`${styles.listSpan} font-body-normal-bold`}>
              <p>Куратор программы</p>
              <div className={styles.toggleIcon}>
                <ToggleListIcon />
              </div>
            </summary>
            <div className={styles.content}>
              <div>{data.curatorName}</div>
              <div className={styles.listItem}>{data.curatorInfo}</div>
            </div>
          </details>
        </div>
        <button className='button-large'>Записаться</button>
      </div>
    </>
  );
}
