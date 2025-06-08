import { IsNotEmpty, IsOptional, IsString, IsDateString, IsNumber, IsPositive } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  durationWeeks?: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsNumber()
  priceRub?: number;
}
