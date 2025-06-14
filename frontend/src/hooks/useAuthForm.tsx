'use client';

import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/contexts/AuthContext';
import { isFullName, isPhone, isStrongPassword } from '@/lib/validators';
import { useToastManager } from './useToastManager';

export const useAuthForm = (mode: 'login' | 'register') => {
  const { login, register } = useAuth();
  const router = useRouter();

  /* ── локальный state ───────────────────────────── */
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [state, setState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [serverErr, setServerErr] = useState<string | null>(null);
  const { toasts, push: pushErr, remove: clearErr } = useToastManager();

  const disabled = state !== 'idle';

  /* ── клиент-side валидация ─────────────────────── */
  const validate = () => {
    let ok = true;
    if (mode === 'register') {
      if (!isFullName(form.fullName)) {
        pushErr('fullName', 'Введите ФИО');
        ok = false;
      }
      if (!isPhone(form.phone)) {
        pushErr('phone', 'Неверный телефон');
        ok = false;
      }
      if (!isStrongPassword(form.password)) {
        pushErr('password', 'Пароль ≥ 8 симв. + цифра/симв.');
        ok = false;
      }
      if (form.password !== form.confirm) {
        pushErr('confirm', 'Пароли не совпадают');
        ok = false;
      }
    }
    return ok;
  };

  /* ── submit ────────────────────────────────────── */
  const submit = async () => {
    if (!validate()) return;
    try {
      setState('sending');

      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(
          form.fullName.trim(),
          form.phone.replace(/\s+/g, ''),
          form.email,
          form.password
        );
      }

      setState('success');
      setTimeout(() => router.push('/'), 1000);
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 400) {
        const code = err.response.data?.message;
        handleCode(code);
      } else if (err instanceof Error) {
        handleCode(err.message);
      } else {
        setServerErr('Не удалось выполнить запрос');
      }
      setState('idle');
    }
  };

  function handleCode(code?: string) {
    switch (code) {
      case 'EMAIL_TAKEN':
        pushErr('email', 'E-mail уже занят');
        break;
      case 'PHONE_TAKEN':
        pushErr('phone', 'Телефон уже занят');
        break;
      default:
        setServerErr('Ошибка валидации');
    }
  }

  /* ── публичный API хука ───────────────────────── */
  return {
    form,
    setForm,
    state,
    disabled,
    serverErr,
    submit,
    toasts,
    clearErr,
  };
};
