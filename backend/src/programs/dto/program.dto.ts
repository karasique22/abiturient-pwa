import { Expose, Transform } from 'class-transformer';
import {
  Program,
  ProgramCategory,
  ProgramDocument,
  ProgramFormat,
  ProgramImage,
  ProgramLevel,
} from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export class ProgramDto implements Program {
  id!: string;
  slug!: string;
  title!: string;
  description!: string;
  durationHours!: number | null;
  category!: ProgramCategory;
  level!: ProgramLevel;
  format!: ProgramFormat;
  durationYears!: number;
  document!: ProgramDocument;
  content!: JsonValue;
  curatorName: string;
  curatorInfo: string;
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
