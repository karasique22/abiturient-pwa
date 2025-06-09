// src/events/dto/event.dto.ts
import { Expose, Transform } from 'class-transformer';
import { Event, EventCategory, EventImage } from '@prisma/client';

export class EventDto implements Event {
  /* базовые поля из модели Event */
  id!: string;
  slug!: string;
  title!: string;
  description!: string;
  dateTime!: Date;
  address!: string;
  category!: EventCategory;
  curatorName!: string;
  curatorInfo!: string | null;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  /* связь, полученная через include */
  images!: EventImage[];

  constructor(partial: Partial<EventDto>) {
    Object.assign(this, partial);
  }

  /* вычисляемое поле — обложка */
  @Transform(({ obj }) => obj.images?.[0]?.url ?? null)
  @Expose()
  coverUrl!: string | null;
}
