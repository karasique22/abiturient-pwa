import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async notifyEmail(userId: string, title: string, message: string) {
    // TODO: отправка push
    return this.prisma.notification.create({
      data: { userId, title, message, type: 'email' },
    });
  }
}
