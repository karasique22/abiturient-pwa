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
