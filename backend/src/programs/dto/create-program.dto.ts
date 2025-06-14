import {
  IsString,
  IsUrl,
  IsOptional,
  IsDateString,
  IsEnum,
  isEnum,
} from 'class-validator';
import {
  ProgramLevel,
  ProgramFormat,
  ProgramDocument,
  ProgramCategory,
} from '@prisma/client';

export class CreateProgramDto {
  @IsString()
  slug: string;

  @IsString()
  title: string;

  @IsString()
  curatorName: string;

  @IsString()
  description: string;

  @IsUrl()
  @IsOptional()
  coverUrl?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsEnum(ProgramFormat)
  format: ProgramFormat;

  @IsEnum(ProgramCategory)
  category: ProgramCategory;

  @IsEnum(ProgramLevel)
  @IsOptional()
  level?: ProgramLevel;

  @IsEnum(ProgramDocument)
  @IsOptional()
  document?: ProgramDocument;
}
