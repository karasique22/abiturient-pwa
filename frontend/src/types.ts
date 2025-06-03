import type { Event as EventDB } from '@prisma/client';

export interface EventApi extends Omit<EventDB, 'images'> {
  coverUrl: string | null;
}
