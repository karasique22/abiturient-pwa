interface ListViewIconProps {
  active?: boolean;
}

export default function ListViewIcon({ active = false }: ListViewIconProps) {
  const strokeColor = active ? '#25242C' : '#929195';

  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.5 8.55C1.5 7.6815 1.6815 7.5 2.55 7.5H15.45C16.3185 7.5 16.5 7.6815 16.5 8.55V9.45C16.5 10.3185 16.3185 10.5 15.45 10.5H2.55C1.6815 10.5 1.5 10.3185 1.5 9.45V8.55ZM1.5 2.55C1.5 1.6815 1.6815 1.5 2.55 1.5H15.45C16.3185 1.5 16.5 1.6815 16.5 2.55V3.45C16.5 4.3185 16.3185 4.5 15.45 4.5H2.55C1.6815 4.5 1.5 4.3185 1.5 3.45V2.55ZM1.5 14.55C1.5 13.6815 1.6815 13.5 2.55 13.5H15.45C16.3185 13.5 16.5 13.6815 16.5 14.55V15.45C16.5 16.3185 16.3185 16.5 15.45 16.5H2.55C1.6815 16.5 1.5 16.3185 1.5 15.45V14.55Z'
        stroke={strokeColor}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
