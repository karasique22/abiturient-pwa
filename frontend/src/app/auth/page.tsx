import Link from 'next/link';
import styles from './auth.module.css';

export default function AuthLanding() {
  return (
    <div className={styles.authContainer}>
      <h1 className={`${styles.authTitle} font-header-large`}>
        <span>Добро пожаловать</span>
        <span>в мир знаний</span>
      </h1>

      <div className={styles.authButtons}>
        <Link
          href='/auth/login'
          scroll={false}
          className={`${styles.authButton} button-large`}
        >
          Войти
        </Link>
        <Link
          href='/auth/register'
          scroll={false}
          className={`${styles.authButton} button-large`}
        >
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}
