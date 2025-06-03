import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.EventCreateInput) {
    return this.prisma.event.create({ data });
  }

  findAll() {
    return this.prisma.event.findMany({
      where: { isActive: true },
      include: {
        images: {
          orderBy: { order: 'asc' },
          take: 1,
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: 'asc' },
          take: 1,
        },
      },
    });
  }

  update(id: string, data: Prisma.EventUpdateInput) {
    return this.prisma.event.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.event.update({
      where: { id },
      data: { isActive: false }, // soft-delete
    });
  }
}
