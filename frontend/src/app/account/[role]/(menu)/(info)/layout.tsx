import { ReactNode } from 'react';
import styles from './layout.module.css';

export default function InfoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='container background-container'>
        <div className={styles.infoWrapper}>{children}</div>
      </div>
    </>
  );
}
