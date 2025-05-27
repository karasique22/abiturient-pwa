import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  constructor(private service: ApplicationsService) {}

  @Post()
  create(@Body() dto: any, @Req() req) {
    return this.service.create({ ...dto, userId: req.user.userId, status: 'new' });
  }

  @Get('my')
  my(@Req() req) {
    return this.service.findMy(req.user.userId);
  }
}
