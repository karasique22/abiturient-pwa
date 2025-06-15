'use client';

import { ReactNode } from 'react';
import { useSelectedLayoutSegment, useParams } from 'next/navigation';
import PageBackHeader from '@/components/ui/PageBackHeader/PageBackHeader';
import { roleMenu } from '../../roleMenu';

export default function SectionLayout({ children }: { children: ReactNode }) {
  const segment = useSelectedLayoutSegment();
  const { role } = useParams();

  const title =
    roleMenu[role as keyof typeof roleMenu]?.find((m) => m.href === segment)
      ?.label ?? '';

  return (
    <>
      <PageBackHeader headerTitle={title} />
      {children}
    </>
  );
}
