import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMe } from '@/lib/getMe';
import styles from './AuthForm.module.css';

export default async function AuthLanding() {
  const access = (await cookies()).get('accessToken')?.value;
  if (access) redirect('/account');

  const me = await getMe({ headers: { Authorization: `Bearer ${access}` } });
  if (me) redirect('/account');

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
