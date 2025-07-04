import styles from './LinkIcon.module.css';

export default function LinkIcon({
  direction,
}: {
  direction: 'back' | 'forward';
}) {
  return (
    <div
      className={`${styles.linkContainer} ${
        direction === 'forward' ? styles.forwardLink : styles.backLink
      }`}
    >
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M10.126 14C10.2208 14 10.3179 13.9597 10.3908 13.8815C10.5364 13.7251 10.5364 13.4692 10.3908 13.3129L5.40585 7.96031L10.3179 2.68595C10.4636 2.52957 10.4636 2.27367 10.3179 2.11729C10.1723 1.96091 9.93398 1.96091 9.78834 2.11729L4.60923 7.67598C4.46359 7.83236 4.46359 8.08826 4.60923 8.24464L9.85896 13.8815C9.93398 13.9621 10.0289 14 10.126 14Z'
          fill='#25242C'
        />
      </svg>
    </div>
  );
}
