import React from 'react';
import Link from 'next/link';

import { studentMenu } from './studentMenu';
import styles from '../account.module.css';

type Props = {};

const page = (props: Props) => {
  return (
    <div className='container'>
      <div className={styles.menuButtonContainer}>
        {studentMenu.map((link) => (
          <Link
            key={link.label}
            className={`${styles.menuButton} font-body-normal-bold`}
            href={link.href}
          >
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
