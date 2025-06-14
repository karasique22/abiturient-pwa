'use client';

import Link from 'next/link';
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
  return (
    <div className='container'>
      <div className={`${styles.fullname} font-header-medium`}>{fullName}</div>
      <div className={styles.buttonContainer}>
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
