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
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventDto } from './dto/event.dto';

@UseInterceptors(ClassSerializerInterceptor) // глобальная сериализация
@Controller('events')
export class EventsController {
  constructor(private readonly service: EventsService) {}

  /** ────────────────  POST /events  ──────────────── */
  @Post()
  async create(@Body() dto: CreateEventDto): Promise<EventDto> {
    const event = await this.service.create(dto);
    return new EventDto(event);
  }

  /** ────────────────  GET /events  ──────────────── */
  @Get()
  async list(): Promise<EventDto[]> {
    const events = await this.service.findAll();
    return events.map((e) => new EventDto(e));
  }

  /** ────────────────  GET /events/:id  ──────────────── */
  @Get(':id')
  async get(@Param('id') id: string): Promise<EventDto> {
    const event = await this.service.findOne(id);
    return new EventDto(event);
  }

  /** ────────────────  PATCH /events/:id  ──────────────── */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
  ): Promise<EventDto> {
    const event = await this.service.update(id, dto);
    return new EventDto(event);
  }

  /** ────────────────  DELETE /events/:id  ──────────────── */
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<EventDto> {
    const event = await this.service.remove(id);
    return new EventDto(event);
  }
}
