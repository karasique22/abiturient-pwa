// FIXME:
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LinkIcon from '@/components/icons/LinkIcon/LinkIcon';
import styles from './account.module.css';

export type MenuItem = { href: string; label: string };

export default function AccountHome({
  fullName,
  menu,
}: {
  fullName: string;
  menu: MenuItem[];
}) {
  const router = useRouter();

  return (
    <div className='container'>
      <div className={`${styles.fullname} container-header`}>
        <button
          className='backlink'
          onClick={() => router.back()}
          aria-label='Назад'
        >
          <LinkIcon direction='back' />
        </button>
        <div className='font-header-medium'>{fullName}</div>
      </div>
      <div className={styles.buttonsContainer}>
        {menu.map((link) => (
          <Link
            className={`${styles.button} font-body-normal-medium`}
            key={link.label}
            href={link.href}
          >
            <span>{link.label}</span>
            <LinkIcon direction='forward' />
          </Link>
        ))}
      </div>
    </div>
  );
}
