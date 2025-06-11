'use client';

import { useState } from 'react';
import styles from './Modal.module.css';

type Status = 'idle' | 'pending' | 'success';

interface Props {
  /*-- открыта ли модалка --*/
  open: boolean;
  /*-- главный заголовок/текст (можно React-узел) --*/
  message: React.ReactNode;
  /*-- надпись на кнопке (idle → pending → success) --*/
  labels: {
    idle: string;
    pending: string;
    success: string;
  };
  /*-- вызвать запрос, вернуть Promise --*/
  onConfirm: () => Promise<void>;
  /*-- по закрытию (клик вне, success timeout, ✕) --*/
  onClose: () => void;
  /*-- вид кнопки: primary | danger | secondary … --*/
  variant?: 'primary' | 'danger';
  /*-- через сколько мс закрываться после success --*/
  successDelay?: number;
}

export default function ActionModal({
  open,
  message,
  labels,
  onConfirm,
  onClose,
  variant = 'primary',
  successDelay = 2000,
}: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>();

  if (!open) return null;

  const handle = async () => {
    setStatus('pending');
    setError(undefined);
    try {
      await onConfirm();
      setStatus('success');
      setTimeout(onClose, successDelay);
    } catch {
      setError('Произошла ошибка');
      setStatus('idle');
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role='dialog'
        aria-modal='true'
      >
        <p className={styles.text}>{message}</p>

        <button
          className={`button-large ${variant} ${
            status === 'success' ? 'success-button' : ''
          }`}
          disabled={status !== 'idle'}
          onClick={handle}
        >
          {labels[status]}
        </button>

        {error && <p className='text-red-600 mt-2'>{error}</p>}
      </div>
    </div>
  );
}
