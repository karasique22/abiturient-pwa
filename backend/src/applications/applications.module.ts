import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { PrismaModule } from '../database/prisma.module';
import { ProgramsModule } from '../programs/programs.module';

@Module({
  imports: [PrismaModule, ProgramsModule],
  providers: [ApplicationsService],
  controllers: [ApplicationsController],
})
export class ApplicationsModule {}
