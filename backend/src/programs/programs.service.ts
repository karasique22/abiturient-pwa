import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';
import { slugify } from 'src/shared/slugify';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ProgramCreateInput) {
    const slug = slugify(data.title);
    return this.prisma.program.create({ data: { ...data, slug } });
  }

  findAll() {
    return this.prisma.program.findMany({
      where: { isActive: true },
      include: {
        images: {
          orderBy: { order: 'asc' },
          take: 1,
        },
      },
    });
  }

  findOne(slug: string) {
    return this.prisma.program.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { order: 'asc' },
          take: 1,
        },
      },
    });
  }
}
