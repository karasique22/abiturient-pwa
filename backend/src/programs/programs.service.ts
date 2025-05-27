import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ProgramCreateInput) {
    return this.prisma.program.create({ data });
  }

  findAll() {
    return this.prisma.program.findMany({ where: { isActive: true } });
  }

  findOne(id: string) {
    return this.prisma.program.findUnique({ where: { id } });
  }
}
