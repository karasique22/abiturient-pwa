'use client';

import Link from 'next/link';
import LinkIcon from '@/components/icons/LinkIcon/LinkIcon';

import styles from './Account.module.css';

export type MenuItem = { href: string; label: string };

interface Props {
  role: string;
  fullName: string;
  menu: MenuItem[];
}

export default function AccountHome({ role, fullName, menu }: Props) {
  return (
    <div className='container'>
      <div className={`${styles.fullname} container-header`}>
        <div className='font-header-medium'>{fullName}</div>
      </div>

      <div className={styles.buttonsContainer}>
        {menu.map(({ href, label }) => (
          <Link
            key={href}
            href={`${role}/${href}`}
            className={`${styles.button} font-body-medium`}
          >
            <span>{label}</span>
            <LinkIcon direction='forward' />
          </Link>
        ))}
      </div>
    </div>
  );
}
