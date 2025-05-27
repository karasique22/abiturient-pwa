import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getMetrics() {
    const users = await this.prisma.user.count();
    const programs = await this.prisma.program.count({ where: { isActive: true } });
    const applications = await this.prisma.application.count();
    return { users, programs, applications };
  }
}
