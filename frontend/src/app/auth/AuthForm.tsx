'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthInputField from '@/components/ui/AuthInputField/AuthInputField';
import EyeIcon from '@/components/icons/EyeIcon';
import { useAuthForm } from '@/hooks/useAuthForm';
import styles from './AuthForm.module.css';

type Mode = 'login' | 'register';

export default function AuthForm({ mode }: { mode: Mode }) {
  const {
    form,
    setForm,
    state,
    disabled,
    serverErr,
    submit,
    toasts,
    clearErr,
  } = useAuthForm(mode);

  const [showPw, setShowPw] = useState(false);
  const router = useRouter();

  const fld = (k: keyof typeof form, ph: string, opt?: any) => (
    <AuthInputField
      {...opt}
      placeholder={ph}
      value={form[k]}
      onChange={(v) => setForm({ ...form, [k]: v })}
      error={toasts[k]}
      onClearError={() => clearErr(k)}
      disabled={disabled}
    />
  );

  return (
    <div className={styles.authContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className={styles.form}
        autoComplete='off'
      >
        <h2 className='font-header-large'>
          {mode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
        </h2>
        {mode === 'register' && (
          <>
            {fld('fullName', 'ФИО')}
            {fld('phone', 'Номер телефона', {
              mask: '+{7} (000) 000-00-00',
              type: 'tel',
            })}
          </>
        )}
        {fld('email', 'Электронная почта', { type: 'email' })}
        <div className={styles.passwordWrap}>
          {fld('password', 'Пароль', { type: showPw ? 'text' : 'password' })}
          <button
            type='button'
            className={styles.eyeBtn}
            onClick={() => setShowPw(!showPw)}
            tabIndex={-1}
          >
            <EyeIcon open={showPw} />
          </button>
        </div>
        {mode === 'register' &&
          fld('confirm', 'Подтвердите пароль', {
            type: showPw ? 'text' : 'password',
          })}
        {mode === 'register' && (
          <p className={styles.smallNote}>
            Регистрируясь, вы подтверждаете согласие на обработку персональных
            данных
          </p>
        )}
        <button
          type='submit'
          className={`button-large ${styles.authButton} ${
            state === 'success' ? 'success-button' : ''
          }`}
          disabled={disabled}
        >
          {state === 'success'
            ? 'Успешно!'
            : state === 'sending'
            ? mode === 'login'
              ? 'Входим…'
              : 'Регистрируем…'
            : mode === 'login'
            ? 'Войти'
            : 'Зарегистрироваться'}
        </button>

        {serverErr && <p className={styles.serverError}>{serverErr}</p>}

        <div className={styles.switchLine}>
          {mode === 'login' ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}
          <button
            type='button'
            className={`${styles.authButton} button-large button-secondary`}
            onClick={() =>
              router.push(mode === 'login' ? '/auth/register' : '/auth/login')
            }
            disabled={state === 'sending'}
          >
            {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </form>
    </div>
  );
}
