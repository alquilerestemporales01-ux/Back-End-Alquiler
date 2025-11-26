import { Module } from '@nestjs/common';
import { KeyHandoverTaskService } from './key_handover_task.service';
import { KeyHandoverTaskController } from './key_handover_task.controller';

@Module({
  controllers: [KeyHandoverTaskController],
  providers: [KeyHandoverTaskService],
})
export class KeyHandoverTaskModule {}
