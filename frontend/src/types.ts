import type { Event as EventDB, Program as ProgramDB } from '@prisma/client';
// FIXME: пофиксить
export interface EventApi extends Omit<EventDB, 'images'> {
  coverUrl: string | null;
}

export interface ProgramApi extends Omit<ProgramDB, 'images'> {
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
