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
          <button
            key={link.label}
            className={`${styles.menuButton} font-body-normal-bold`}
          >
            <span>{link.label}</span>
            <Link href={link.href} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default page;
