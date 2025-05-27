import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ApplicationUncheckedCreateInput) {
    // Проверяем, что нет дубликата
    const exists = await this.prisma.application.findFirst({
      where: { userId: data.userId, programId: data.programId },
    });
    if (exists) throw new BadRequestException('Application already exists');
    return this.prisma.application.create({ data });
  }

  findMy(userId: string) {
    return this.prisma.application.findMany({ where: { userId } });
  }
}
