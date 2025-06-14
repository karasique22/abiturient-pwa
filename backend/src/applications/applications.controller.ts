import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  constructor(private service: ApplicationsService) {}

  @Post()
  create(@Body() dto: CreateApplicationDto, @Req() req) {
    return this.service.create({
      ...dto,
      userId: req.user.userId,
    });
  }

  @Get('my')
  my(@Req() req) {
    return this.service.findMy(req.user.userId);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @Req() req) {
    return this.service.cancel(id, req.user.userId);
  }
}
