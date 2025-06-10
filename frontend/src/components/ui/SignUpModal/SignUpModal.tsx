import React from 'react';
import styles from './SignUpModal.module.css';

interface Props {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function SignUpModal({ open, title, onConfirm, onClose }: Props) {
  if (!open) return null;

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
        <button className='button-large' onClick={onConfirm}>
          Подтвердить запись
        </button>
      </div>
    </div>
  );
}
