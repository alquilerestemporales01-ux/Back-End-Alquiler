Simport { Injectable } from '@nestjs/common';
import { CreateCleaningTaskDto } from './dto/create-cleaning_task.dto';
import { UpdateCleaningTaskDto } from './dto/update-cleaning_task.dto';

@Injectable()
export class CleaningTaskService {
  create(createCleaningTaskDto: CreateCleaningTaskDto) {
    return 'This action adds a new cleaningTask';
  }

  findAll() {
    return `This action returns all cleaningTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cleaningTask`;
  }

  update(id: number, updateCleaningTaskDto: UpdateCleaningTaskDto) {
    return `This action updates a #${id} cleaningTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} cleaningTask`;
  }
}
