import type { Event as EventDB, Program as ProgramDB } from '@prisma/client';
// FIXME: зачем?
export interface EventApi extends Omit<EventDB, 'images'> {
  coverUrl: string | null;
}

export interface ProgramApi extends ProgramDB {
  coverUrl?: string | null;
}
