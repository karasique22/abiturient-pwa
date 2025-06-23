'use client';

import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner} />
      <p className={styles.text}>Загрузка…</p>
    </div>
  );
}
