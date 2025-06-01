import Link from 'next/link';
import styles from './auth.module.css';

// FIXME: Объединить файлы в один

export default function AuthPage() {
  return (
    <div className={styles.authContainer}>
      <h1 className={`${styles.authTitle} font-header-large`}>
        <span>Добро пожаловать</span>
        <span>в мир знаний</span>
      </h1>
      <div className={styles.authWelcome}>
        <div className={`${styles.authButtons} font-body-normal-bold`}>
          <Link href='/auth/login'>
            <button className={styles.authButton}>Войти</button>
          </Link>
          <Link href='/auth/register'>
            <button className={styles.authButton}>Зарегистрироваться</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
