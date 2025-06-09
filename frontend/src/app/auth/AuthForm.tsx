'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from './auth.module.css';

type Mode = 'login' | 'register';

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const { login, register } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await (mode === 'login' ? login : register)(form.email, form.password);
      setIsSuccess(true);
      setTimeout(() => router.push('/'), 1000);
    } catch (e) {
      setError('Неверный логин или пароль');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={`${styles.authTitle} font-header-large`}>
          {mode === 'login' ? 'Вход' : 'Регистрация'}
        </h2>

        <input
          id='email'
          type='email'
          required
          className={styles.input}
          value={form.email}
          placeholder='электронная почта'
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          disabled={isSubmitting || isSuccess}
        />

        <input
          id='password'
          type='password'
          required
          className={styles.input}
          value={form.password}
          placeholder='пароль'
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          disabled={isSubmitting || isSuccess}
        />

        <button
          type='submit'
          className={`${styles.authButton} button-large ${
            isSuccess ? styles.success : ''
          }`}
          disabled={isSubmitting || isSuccess}
        >
          {isSuccess
            ? 'Успешно!'
            : isSubmitting
            ? mode === 'login'
              ? 'Вход...'
              : 'Регистрация...'
            : mode === 'login'
            ? 'Войти'
            : 'Зарегистрироваться'}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
