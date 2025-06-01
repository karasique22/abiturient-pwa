'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

import styles from '../auth.module.css';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      router.push('/');
    } catch (e) {
      setError('Неверный логин или пароль');
    }
  }

  return (
    <div className={styles.authContainer}>
      <h1 className={`${styles.authTitle} font-header-large`}>
        Вход в аккаунт
      </h1>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder='почта'
          type='email'
          required
          autoComplete='email'
        />
        <input
          className={styles.input}
          type='password'
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder='пароль'
          required
        />
        {error && <p>{error}</p>}
        <button className={styles.authButton} type='submit'>
          Войти
        </button>
      </form>
    </div>
  );
}
