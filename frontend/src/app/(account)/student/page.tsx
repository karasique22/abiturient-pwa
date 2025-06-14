import React from 'react';
import Link from 'next/link';

import { studentMenu } from '../studentMenu';
import LinkIcon from '@/components/icons/LinkIcon/LinkIcon';
import styles from '../account.module.css';

export default function Page() {
  return (
    <div className='container'>
      <div className={`${styles.fullname} font-header-medium`}>
        Кашникова Полина Руслановна
      </div>
      <div className={styles.buttonContainer}>
        {studentMenu.map((link) => (
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
