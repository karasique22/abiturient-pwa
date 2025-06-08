import type { Event as EventDB } from '@prisma/client';
// FIXME: зачем?
export interface EventApi extends Omit<EventDB, 'images'> {
  coverUrl: string | null;
}

export interface ProgramApi {
  id: string;
  slug: string;
  title: string;
  description: string;
  startDate?: string | Date | null;
  durationWeeks?: number | null;
  priceRub?: number | null;
  coverUrl: string | null;
}

export interface ItemApi {
  id: string;
  slug: string;
  title: string;
  startDate?: string | Date | null;
  coverUrl: string | null;
  type: 'event' | 'program';
}
