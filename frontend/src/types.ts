import type { Event as EventDB, Program as ProgramDB } from '@prisma/client';
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

interface BaseApplicationApi {
  id: string;
  status: 'NEW' | 'CANCELLED' | 'APPROVED';
}

export interface EventApplicationApi extends BaseApplicationApi {
  eventId: string;
  programId: null;
  event: Pick<EventApi, 'id' | 'slug' | 'title' | 'address' | 'category'>;
  program?: undefined;
}

export interface ProgramApplicationApi extends BaseApplicationApi {
  programId: string;
  eventId: null;
  program: Pick<ProgramApi, 'id' | 'slug' | 'title' | 'category'>;
  event?: undefined;
}

export type ApplicationApi = EventApplicationApi | ProgramApplicationApi;
