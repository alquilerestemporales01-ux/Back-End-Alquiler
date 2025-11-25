import { PartialType } from '@nestjs/swagger';
import { CreateKeyHandoverTaskDto } from './create-key_handover_task.dto';

export class UpdateKeyHandoverTaskDto extends PartialType(CreateKeyHandoverTaskDto) {}
