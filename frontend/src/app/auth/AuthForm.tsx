'use client';

import { IMaskInput } from 'react-imask';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
// import EyeIcon from '@/components/icons/EyeIcon';
import { isFullName, isPhone, isStrongPassword } from '@/lib/validators';

import styles from './auth.module.css';

type Mode = 'login' | 'register';

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const { login, register } = useAuth();

  /* -------------------- state -------------------- */
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [showPassword, setshowPassword] = useState(false);
  const [error, setError] = useState('');
  const [subm, setSubm] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ───── submit ───── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    /* ===== КЛИЕНТСКАЯ ПРОВЕРКА ===== */
    if (mode === 'register') {
      if (!isFullName(form.name)) {
        setError('Введите Фамилию Имя (и отчество при наличии)');
        return;
      }
      if (!isPhone(form.phone)) {
        setError('Телефон должен быть вида +7 (XXX) XXX-XX-XX');
        return;
      }
      if (!isStrongPassword(form.password)) {
        setError(
          'Пароль не меньше 8 симв., строчные/прописные буквы и цифра/символ'
        );
        return;
      }
      if (form.password !== form.confirm) {
        setError('Пароли не совпадают');
        return;
      }
    }

    try {
      setSubm(true);
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
      setError(
        mode === 'login'
          ? 'Неверный логин или пароль'
          : 'Не удалось зарегистрироваться'
      );
    } finally {
      setSubm(false);
    }
  };

  /* ----------------- helpers --------------------- */
  // FIXME: убрать автокомплит из регистрации
  const disabled = subm || success;
  const input = (
    key: keyof typeof form,
    placeholder: string,
    opts: { type?: string; mask?: string } = {}
  ) => {
    const { type = 'text', mask } = opts;
    const onChange = (val: string) => setForm({ ...form, [key]: val });

    /* ---------- masked поле ---------- */
    if (mask) {
      return (
        <IMaskInput
          mask={mask}
          overwrite
          type={type}
          placeholder={placeholder}
          className={styles.input}
          required
          disabled={disabled}
          value={form[key]}
          onAccept={(val: any) => onChange(String(val))}
        />
      );
    }

    /* ---------- обычный input ---------- */
    return (
      <input
        required
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    );
  };

  /* ------------------ render --------------------- */
  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={`${styles.authTitle} font-header-large`}>
          {mode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
        </h2>

        {/* -------- register-fields -------- */}
        {mode === 'register' && (
          <>
            {input('name', 'ФИО')}
            {input('phone', 'Номер телефона', {
              mask: '+{7} (000) 000-00-00',
              type: 'tel',
            })}
          </>
        )}

        {/* -------- общие поля -------- */}
        {input('email', 'Электронная почта')}

        <div className={styles.passwordWrap}>
          <input
            required
            className={styles.input}
            type={showPassword ? 'text' : 'password'}
            placeholder='Пароль'
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            disabled={disabled}
          />
          <button
            type='button'
            className={styles.eyeBtn}
            onClick={() => setshowPassword(!showPassword)}
            tabIndex={-1}
          >
            {/* <EyeIcon open={showPassword} /> */}
          </button>
        </div>

        {mode === 'register' && (
          <input
            required
            className={styles.input}
            type='password'
            placeholder='Подтвердите пароль'
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            disabled={disabled}
          />
        )}

        {mode === 'register' && (
          <p className={styles.smallNote}>
            Регистрируясь, вы подтверждаете согласие на&nbsp;обработку
            персональных данных
          </p>
        )}

        {/* -------- button -------- */}
        <button
          type='submit'
          className={`${styles.authButton} button-large ${
            success ? 'success-button' : ''
          }`}
          disabled={disabled}
        >
          {success
            ? 'Успешно!'
            : subm
            ? mode === 'login'
              ? 'Входим…'
              : 'Регистрируем…'
            : mode === 'login'
            ? 'Войти'
            : 'Зарегистрироваться'}
        </button>

        {error && <p className={styles.error}>{error}</p>}

        {/* --- switch link --- */}
        <div className={styles.switchLine}>
          {mode === 'login' ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
          <button
            type='button'
            className={`${styles.authButton} button-large button-secondary`}
            disabled={subm}
            onClick={() =>
              router.push(mode === 'login' ? '/auth/register' : '/auth/login')
            }
          >
            {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </form>
    </div>
  );
}
