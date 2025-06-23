'use client';

import { ReactNode } from 'react';
import { useSelectedLayoutSegments, useParams } from 'next/navigation';
import PageBackHeader from '@/components/ui/PageBackHeader/PageBackHeader';
import { roleMenu } from '../../roleMenu';

export default function SectionLayout({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const lastSegment = segments.at(-1);
  const { role } = useParams();

  const title =
    roleMenu[role as keyof typeof roleMenu]?.find((m) => m.href === lastSegment)
      ?.label ?? '';

  return (
    <>
      <PageBackHeader headerTitle={title} />
      {children}
    </>
  );
}
