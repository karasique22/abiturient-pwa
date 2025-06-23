interface Props {
  open: boolean;
}

export default function EyeIcon({ open }: Props) {
  if (open) {
    return (
      <svg
        width={17}
        height={17}
        viewBox='0 0 20 17'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M18.5896 6.1405C18.8632 6.5239 19 6.7165 19 7C19 7.2844 18.8632 7.4761 18.5896 7.8595C17.3602 9.5839 14.2201 13.3 10 13.3C5.779 13.3 2.6398 9.583 1.4104 7.8595C1.1368 7.4761 1 7.2835 1 7C1 6.7156 1.1368 6.5239 1.4104 6.1405C2.6398 4.4161 5.7799 0.699997 10 0.699997C14.221 0.699997 17.3602 4.417 18.5896 6.1405Z'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.7 7C12.7 6.28392 12.4155 5.59716 11.9092 5.09081C11.4028 4.58447 10.7161 4.3 9.99999 4.3C9.2839 4.3 8.59715 4.58447 8.0908 5.09081C7.58445 5.59716 7.29999 6.28392 7.29999 7C7.29999 7.71609 7.58445 8.40284 8.0908 8.90919C8.59715 9.41554 9.2839 9.7 9.99999 9.7C10.7161 9.7 11.4028 9.41554 11.9092 8.90919C12.4155 8.40284 12.7 7.71609 12.7 7Z'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    );
  }

  /* закрытый глаз */
  return (
    <svg
      width={17}
      height={17}
      viewBox='0 0 20 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17 6C17 6 13.8 10.5 9 10.5C4.2 10.5 1 6 1 6M11.4 10.125L12.6 12M15.4 8.25L17 9.75M1 9.75L2.6 8.25M6.6 10.125L5.4 12'
        stroke='#25242C'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
