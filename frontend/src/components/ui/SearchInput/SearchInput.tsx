import { useRef, useCallback } from 'react';
import styles from './SearchInput.module.css';
import SearchIcon from '@/components/icons/SearchIcon';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function SearchInput({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedOnChange = useCallback(
    debounce((val: string) => onChange(val), 400),
    [onChange]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedOnChange(event.target.value);
  };

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
        onChange={handleInputChange}
      />
      <button className={styles.searchButton} type='submit'>
        <SearchIcon />
      </button>
    </form>
  );
}
