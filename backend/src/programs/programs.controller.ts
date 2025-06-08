import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramDto } from './dto/program.dto';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('programs')
export class ProgramsController {
  constructor(private readonly service: ProgramsService) {}

  /** ────────────────  POST /programs  ──────────────── */
  @Post()
  async create(@Body() dto: CreateProgramDto): Promise<ProgramDto> {
    const program = await this.service.create(dto);
    return new ProgramDto(program);
  }

  /** ────────────────  GET /programs  ──────────────── */
  @Get()
  async list(): Promise<ProgramDto[]> {
    const programs = await this.service.findAll();
    return programs.map((p) => new ProgramDto(p));
  }

  /** ────────────────  GET /programs/:slug  ──────────────── */
  @Get(':slug')
  async get(@Param('slug') slug: string): Promise<ProgramDto> {
    const program = await this.service.findOne(slug);
    return new ProgramDto(program);
  }

  /** ────────────────  PATCH /programs/:id  ──────────────── */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProgramDto,
  ): Promise<ProgramDto> {
    const program = await this.service.update(id, dto);
    return new ProgramDto(program);
  }

  /** ────────────────  DELETE /programs/:id  ──────────────── */
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ProgramDto> {
    const program = await this.service.remove(id);
    return new ProgramDto(program);
  }
}
