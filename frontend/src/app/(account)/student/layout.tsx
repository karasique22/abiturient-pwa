// FIXME:
'use client';

import { useRouter } from 'next/navigation';
import LinkIcon from '@/components/icons/LinkIcon/LinkIcon';
import { log } from 'console';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  console.log(children);

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
        {/* <h2>{cfg.title(data)}</h2> */}
      </div>

      {children}
    </>
  );
}
