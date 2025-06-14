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

  findMy(userId: string) {
    return this.prisma.application.findMany({ where: { userId } });
  }

  async cancel(id: string, userId: string) {
    const app = await this.prisma.application.findUnique({ where: { id } });
    if (!app || app.userId !== userId) {
      throw new NotFoundException();
    }

    if (!app.isActive) return app;

    return this.prisma.application.update({
      where: { id },
      data: { status: 'CANCELLED', isActive: false },
    });
  }
}
