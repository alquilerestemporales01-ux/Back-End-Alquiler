import { Module } from '@nestjs/common';
import { CleaningTaskService } from './cleaning_task.service';
import { CleaningTaskController } from './cleaning_task.controller';

@Module({
  controllers: [CleaningTaskController],
  providers: [CleaningTaskService],
})
export class CleaningTaskModule {}
