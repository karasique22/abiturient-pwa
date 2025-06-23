'use client';

import { useState } from 'react';
import styles from './EditPassword.module.css';
import Toast from '@/components/ui/Toast/Toast';
import { useToastManager } from '@/hooks/useToastManager';
import { isStrongPassword } from '@/lib/validators';

export default function EditPasswordClient() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [serverError, setServerError] = useState('');

  const { toasts, push: pushErr, remove: removeErr } = useToastManager();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setMessage('');

    let hasError = false;

    if (!isStrongPassword(newPassword)) {
      pushErr('newPassword', 'Пароль ≥ 8 симв. + цифра/симв.');
      hasError = true;
    }
    if (newPassword !== confirmPassword) {
      pushErr('confirmPassword', 'Пароли не совпадают');
      hasError = true;
    }
    if (!oldPassword) {
      pushErr('oldPassword', 'Введите старый пароль');
      hasError = true;
    }

    if (hasError) return;

    const res = await fetch('/api/users/change-password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });

    if (res.ok) {
      setMessage('Пароль успешно изменён');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      const data = await res.json();
      setServerError(data.message || 'Ошибка при смене пароля');
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formInputs}>
          <div className={styles.inputBlock}>
            <input
              type='password'
              placeholder='Введите старый пароль'
              autoComplete='off'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className={styles.input}
            />
            {toasts.oldPassword && (
              <Toast
                msg={toasts.oldPassword}
                onClose={() => removeErr('oldPassword')}
              />
            )}
          </div>
          <div className={styles.inputBlock}>
            <input
              type='password'
              placeholder='Придумайте новый пароль'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className={styles.input}
            />
            {toasts.newPassword && (
              <Toast
                msg={toasts.newPassword}
                onClose={() => removeErr('newPassword')}
              />
            )}
          </div>
          <div className={styles.inputBlock}>
            <input
              type='password'
              placeholder='Подтвердите новый пароль'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.input}
            />
            {toasts.confirmPassword && (
              <Toast
                msg={toasts.confirmPassword}
                onClose={() => removeErr('confirmPassword')}
              />
            )}
          </div>
          <div className={`${styles.hint} font-body-regular-small`}>
            Для смены пароля заполните поля.
          </div>
        </div>

        {serverError && <div className={styles.error}>{serverError}</div>}
        {message && <div className={styles.success}>{message}</div>}
        {/* TODO: вынести кнопку в отдельный компонент, чтобы она принимала статусы */}
        <button type='submit' className='button-large'>
          Сохранить изменения
        </button>
      </form>
    </div>
  );
}
