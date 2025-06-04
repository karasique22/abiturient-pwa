import type { Event as EventDB } from '@prisma/client';
// FIXME: зачем?
export interface EventApi extends Omit<EventDB, 'images'> {
  coverUrl: string | null;
}
