'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { IMaskInput } from 'react-imask';
import { motion, AnimatePresence } from 'framer-motion';

import { useAuth } from '@/contexts/AuthContext';
import { isFullName, isPhone, isStrongPassword } from '@/lib/validators';
import EyeIcon from '@/components/icons/EyeIcon';

import styles from './auth.module.css';

type Mode = 'login' | 'register';

/* ─────────────────────────────────────────────────────────────── */

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const { login, register } = useAuth();

  /* ---------- state ---------- */
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirm: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const timers = useRef<Record<string, number>>({});

  const [serverErr, setServerErr] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const disabled = sending || success;
  const dismissAfter = 3_000; // 3 сек

  /* ---------- вспомогалки ---------- */
  const pushError = (field: string, msg: string) => {
    setErrors((p) => ({ ...p, [field]: msg }));

    /* перезаписываем старый таймер, если был */
    clearTimeout(timers.current[field]);

    timers.current[field] = window.setTimeout(() => {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }, dismissAfter);
  };

  const validate = () => {
    let ok = true;
    if (mode === 'register') {
      if (!isFullName(form.name)) {
        pushError('name', 'Введите Фамилию и Имя');
        ok = false;
      }
      if (!isPhone(form.phone)) {
        pushError('phone', 'Формат: +7 (XXX) XXX-XX-XX');
        ok = false;
      }
      if (!isStrongPassword(form.password)) {
        pushError('password', '≥8 симв., Aa1!');
        ok = false;
      }
      if (form.password !== form.confirm) {
        pushError('confirm', 'Пароли не совпадают');
        ok = false;
      }
    }
    return ok;
  };

  /* универсальный input/IMask + всплывашка */
  const field = (
    key: keyof typeof form,
    placeholder: string,
    opts: { type?: string; mask?: string } = {}
  ) => {
    const { type = 'text', mask } = opts;
    const onChange = (val: string) => {
      setForm({ ...form, [key]: val });
      if (errors[key]) setErrors((p) => ({ ...p, [key]: '' }));
    };

    const common = {
      className: styles.input,
      placeholder,
      required: true,
      disabled,
      value: form[key],
    };

    return (
      <div style={{ position: 'relative' }}>
        {mask ? (
          <IMaskInput
            {...common}
            mask={mask}
            overwrite
            type={type}
            onAccept={(v: any) => onChange(String(v))}
          />
        ) : (
          <input
            {...common}
            type={type}
            onChange={(e) => onChange(e.target.value)}
          />
        )}

        {/* всплывашка */}
        <AnimatePresence>
          {errors[key] && (
            <motion.span
              key={key}
              className={styles.errorToast}
              role='alert'
              aria-live='polite'
              onClick={() => {
                clearTimeout(timers.current[key]);
                setErrors((p) => {
                  const copy = { ...p };
                  delete copy[key];
                  return copy;
                });
              }}
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.25 }}
            >
              {errors[key]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    );
  };

  /* ---------- submit ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerErr(null);

    if (!validate()) return;

    try {
      setSending(true);
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(
          form.name.trim(),
          form.phone.replace(/\s+/g, ''),
          form.email,
          form.password
        );
      }
      setSuccess(true);
      setTimeout(() => router.push('/'), 1000);
    } catch {
      setServerErr(
        mode === 'login'
          ? 'Неверный логин или пароль'
          : 'Не удалось зарегистрироваться'
      );
    } finally {
      setSending(false);
    }
  };

  /* ---------- JSX ---------- */
  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.form} autoComplete='off'>
        <h2 className={`${styles.authTitle} font-header-large`}>
          {mode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
        </h2>

        {mode === 'register' && (
          <>
            {field('name', 'ФИО')}
            {field('phone', 'Номер телефона', {
              mask: '+{7} (000) 000-00-00',
              type: 'tel',
            })}
          </>
        )}

        {field('email', 'Электронная почта', { type: 'email' })}

        <div className={styles.passwordWrap}>
          {field('password', 'Пароль', { type: showPw ? 'text' : 'password' })}
          <button
            type='button'
            className={styles.eyeBtn}
            onClick={() => setShowPw((v) => !v)}
            tabIndex={-1}
          >
            <EyeIcon open={showPw} />
          </button>
        </div>

        {mode === 'register' &&
          field('confirm', 'Подтвердите пароль', {
            type: showPw ? 'text' : 'password',
          })}

        {mode === 'register' && (
          <p className={styles.smallNote}>
            Регистрируясь, вы подтверждаете согласие на&nbsp;обработку
            персональных данных
          </p>
        )}

        <button
          type='submit'
          className={`${styles.authButton} button-large ${
            success ? 'success-button' : ''
          }`}
          disabled={disabled}
        >
          {success
            ? 'Успешно!'
            : sending
            ? mode === 'login'
              ? 'Входим…'
              : 'Регистрируем…'
            : mode === 'login'
            ? 'Войти'
            : 'Зарегистрироваться'}
        </button>

        {serverErr && (
          <p className={styles.serverError} role='alert'>
            {serverErr}
          </p>
        )}

        <div className={styles.switchLine}>
          {mode === 'login' ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
          <button
            type='button'
            className='button-large button-secondary'
            onClick={() =>
              router.push(mode === 'login' ? '/auth/register' : '/auth/login')
            }
            disabled={sending}
          >
            {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </form>
    </div>
  );
}
