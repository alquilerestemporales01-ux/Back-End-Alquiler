import { PartialType } from '@nestjs/swagger';
import { CreateCleaningTaskDto } from './create-cleaning_task.dto';

export class UpdateCleaningTaskDto extends PartialType(CreateCleaningTaskDto) {}
