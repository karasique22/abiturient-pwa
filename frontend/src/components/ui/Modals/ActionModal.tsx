'use client';

import { useEffect, useState } from 'react';
import styles from './Modal.module.css';

type Status = 'idle' | 'pending' | 'success';

interface Props {
  open: boolean;
  message: React.ReactNode;
  labels: { idle: string; pending: string; success: string };
  onConfirm: () => Promise<void>;
  onClose: () => void;
  variant?: 'primary' | 'secondary';
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
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setStatus('idle');
      setError(undefined);
      setClosing(false);
    }
  }, [open]);

  if (!open && !closing) return null;

  const handleOverlayClose = () => {
    setClosing(true);
    setTimeout(onClose, 250);
  };

  const handle = async () => {
    setStatus('pending');
    setError(undefined);
    try {
      await onConfirm();
      setStatus('success');
      if (successDelay === 0) {
        handleOverlayClose();
      } else {
        setTimeout(handleOverlayClose, successDelay);
      }
    } catch {
      setError('Произошла ошибка');
      setStatus('idle');
    }
  };

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.fadeOut : ''}`}
      onClick={handleOverlayClose}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role='dialog'
        aria-modal='true'
      >
        <p className={styles.text}>{message}</p>

        <button
          className={`button-large button-${variant} ${
            status === 'success' ? 'success-button' : ''
          }`}
          disabled={status !== 'idle'}
          onClick={handle}
        >
          {labels[status]}
        </button>

        {error && <p className='text-red-600 mt-2 text-center'>{error}</p>}
      </div>
    </div>
  );
}
