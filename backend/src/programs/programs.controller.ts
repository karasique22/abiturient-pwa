import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramDto } from './dto/program.dto';
import { CreateProgramDto } from './dto/create-program.dto';

@Controller('programs')
export class ProgramsController {
  constructor(private service: ProgramsService) {}

  @Get()
  async list(): Promise<ProgramDto[]> {
    const programs = await this.service.findAll();
    return programs.map((p) => new ProgramDto(p));
  }

  @Get(':slug')
  async get(@Param('slug') slug: string): Promise<ProgramDto> {
    const program = await this.service.findOne(slug);
    return new ProgramDto(program);
  }

  @Post()
  async create(@Body() dto: CreateProgramDto): Promise<ProgramDto> {
    const program = await this.service.create(dto);
    return new ProgramDto(program);
  }
}
