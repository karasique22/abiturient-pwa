import { useRef } from 'react';
import styles from './SearchInput.module.css';
import SearchIcon from '@/components/icons/SearchIcon';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const inputValue = inputRef.current?.value || '';
    onChange(inputValue);
  };

  return (
    <form className={styles.searchInput} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        ref={inputRef}
        placeholder='поиск'
        defaultValue={value}
      />
      <button className={styles.searchButton} type='submit'>
        <SearchIcon />
      </button>
    </form>
  );
}
