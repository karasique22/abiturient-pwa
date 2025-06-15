'use client';

import { useRouter } from 'next/navigation';
import LinkIcon from '@/components/icons/LinkIcon/LinkIcon';

interface Props {
  headerTitle: string;
}

export default function PageBackHeader({ headerTitle }: Props) {
  const router = useRouter();

  return (
    <div className='container-header container'>
      <button
        className='backlink'
        onClick={() => router.back()}
        aria-label='Назад'
      >
        <LinkIcon direction='back' />
      </button>
      <h2>{headerTitle}</h2>
    </div>
  );
}
