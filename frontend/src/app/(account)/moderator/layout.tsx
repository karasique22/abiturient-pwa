'use client';

import { useRouter } from 'next/navigation';
import LinkIcon from '@/components/icons/LinkIcon/LinkIcon';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <>
      <div className={`container-header container`}>
        <button
          className='backlink'
          onClick={() => router.back()}
          aria-label='Назад'
        >
          <LinkIcon direction='back' />
        </button>
      </div>

      {children}
    </>
  );
}
