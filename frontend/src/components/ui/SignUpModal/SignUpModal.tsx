// components/ui/SignUpModal/SignUpModal.tsx
'use client';

import { useState } from 'react';
import styles from './SignUpModal.module.css';

interface Props {
  open: boolean;
  title: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function SignUpModal({
  open,
  title,
  onConfirm,
  onClose,
}: Props) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [error, setError] = useState<string>();

  if (!open) return null;

  const handleClick = async () => {
    setSubmitting(true);
    setError(undefined);

    try {
      await onConfirm();
      setSuccess(true);
      setTimeout(onClose, 2000);
    } catch {
      setError('Не удалось записаться');
    } finally {
      setSubmitting(false);
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
        <p className={styles.text}>
          Вы хотите записаться:
          <br />
          <span className='font-body-normal-bold'>{title}</span>
        </p>

        <button
          className={`button-large ${isSuccess ? 'success-button' : ''}`}
          onClick={handleClick}
          disabled={isSubmitting || isSuccess}
        >
          {isSuccess
            ? 'Готово!'
            : isSubmitting
            ? 'Записываем...'
            : 'Подтвердить запись'}
        </button>

        {error && <p className='text-red-600 mt-2'>{error}</p>}
      </div>
    </div>
  );
}
