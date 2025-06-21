import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PrismaService } from '../database/prisma.service';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService, private prisma: PrismaService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req) {
    return this.users.findById(req.user.userId);
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
    await this.users.changePassword(req.user.userId, dto);
    await this.prisma.session.deleteMany({
      where: { userId: req.user.userId },
    });
    return { message: 'Пароль успешно обновлён' };
  }
}
