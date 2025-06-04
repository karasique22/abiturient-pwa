import { IsEnum, IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { EventCategory } from '@prisma/client';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  dateTime: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEnum(EventCategory)
  category: EventCategory;

  @IsString()
  @IsNotEmpty()
  curatorName: string;

  @IsString()
  curatorInfo?: string;
}
