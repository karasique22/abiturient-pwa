import { Expose, Transform } from 'class-transformer';
import { Program, ProgramCategory, ProgramImage } from '@prisma/client';

export class ProgramDto implements Program {
  id!: string;
  slug!: string;
  title!: string;
  description!: string;
  durationHours!: number | null;
  category!: ProgramCategory;
  startDate!: Date | null;
  priceRub!: any;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  images!: ProgramImage[];

  constructor(partial: Partial<ProgramDto>) {
    Object.assign(this, partial);
  }

  @Transform(({ obj }) => obj.images?.[0]?.url ?? null)
  @Expose()
  coverUrl!: string | null;
}
