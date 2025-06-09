import React from 'react';
import Link from 'next/link';

import { studentMenu } from './studentMenu';
import LinkIcon from '@/components/icons/LinkIcon/LinkIcon';
import styles from '../account.module.css';

const page = () => {
  return (
    <div className='container'>
      <div className={styles.menuButtonContainer}>
        {studentMenu.map((link) => (
          <Link
            className={`${styles.menuButton} font-body-normal-bold`}
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
};

export default page;
