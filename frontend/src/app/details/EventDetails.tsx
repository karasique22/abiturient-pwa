'use client';

import GenericDetails from './GenericDetails';
import { eventConfig } from './event-details.config';
import { EventApi } from '@/types';

export default function EventDetails({ data }: { data: EventApi }) {
  return <GenericDetails data={data} config={eventConfig} type='event' />;
}
