import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ApplicationUncheckedCreateInput) {
    const { userId, programId, eventId } = data;

    // Нужен либо programId, либо eventId, но не оба сразу
    if (!programId && !eventId)
      throw new BadRequestException('programId or eventId is required');

    if (programId && eventId)
      throw new BadRequestException(
        'Pass either programId or eventId, not both',
      );

    // Проверяем уникальность пары userId + (programId | eventId)
    const exists = await this.prisma.application.findFirst({
      where: {
        userId,
        status: 'NEW',
        ...(programId ? { programId } : { eventId }),
      },
    });

    if (exists) throw new BadRequestException('Application already exists');

    return this.prisma.application.create({ data });
  }

  findAllEvents() {
    return this.prisma.application.findMany({
      where: { eventId: { not: null }, status: { not: 'CANCELLED' } },
      include: {
        event: {
          select: {
            id: true,
            slug: true,
            title: true,
            dateTime: true,
            address: true,
            category: true,
          },
        },
        user: {
          select: {
            fullName: true,
          },
        },
      },
    });
  }

  findAllPrograms() {
    return this.prisma.application.findMany({
      where: { programId: { not: null }, status: { not: 'CANCELLED' } },
      include: {
        program: {
          select: {
            id: true,
            slug: true,
            title: true,
            category: true,
          },
        },
        user: {
          select: {
            fullName: true,
          },
        },
      },
    });
  }

  findMy(userId: string) {
    return this.prisma.application.findMany({ where: { userId } });
  }

  findMyEvents(userId: string) {
    return this.prisma.application.findMany({
      where: {
        userId,
        status: 'NEW',
        eventId: { not: null },
      },
      include: {
        event: {
          select: {
            id: true,
            slug: true,
            title: true,
            dateTime: true,
            address: true,
            category: true,
          },
        },
      },
    });
  }

  findMyPrograms(userId: string) {
    return this.prisma.application.findMany({
      where: { userId, programId: { not: null }, status: { not: 'CANCELLED' } },
      include: {
        program: {
          select: {
            id: true,
            slug: true,
            title: true,
            category: true,
          },
        },
      },
    });
  }

  async cancel(id: string, userId: string, role: string) {
    const app = await this.prisma.application.findUnique({ where: { id } });
    if (!app) {
      if (app.userId !== userId || role === 'student') {
        throw new NotFoundException();
      }
    }

    if (!app.isActive) return app;

    return this.prisma.application.update({
      where: { id },
      data: { status: 'CANCELLED', isActive: false },
    });
  }

  async changeStatus(id: string, status: 'NEW' | 'APPROVED' | 'CANCELLED') {
    const app = await this.prisma.application.findUnique({ where: { id } });
    if (!app) {
      throw new NotFoundException();
    }

    if (status === 'NEW') {
      return this.prisma.application.update({
        where: { id },
        data: { status: 'APPROVED', isActive: true },
      });
    } else {
      return this.prisma.application.update({
        where: { id },
        data: { status: 'NEW' },
      });
    }
  }
}
