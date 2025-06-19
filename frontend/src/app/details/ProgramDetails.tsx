'use client';

import GenericDetails from './GenericDetails';
import { programConfig } from './program-details.config';
import { ProgramApi } from '@/types';

export default function ProgramDetails({ data }: { data: ProgramApi }) {
  return <GenericDetails data={data} config={programConfig} type='program' />;
}
