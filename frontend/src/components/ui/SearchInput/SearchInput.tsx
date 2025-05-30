import styles from './SearchInput.module.css';
import SearchIcon from '@/components/icons/SearchIcon';

export default function SearchInput() {
  return (
    <div className={styles.searchInput}>
      <input className={styles.input} placeholder='поиск' />
      <button className={styles.searchButton}>
        <SearchIcon />
      </button>
    </div>
  );
}
