import { Injectable } from '@nestjs/common';
import { CreateKeyHandoverTaskDto } from './dto/create-key_handover_task.dto';
import { UpdateKeyHandoverTaskDto } from './dto/update-key_handover_task.dto';

@Injectable()
export class KeyHandoverTaskService {
  create(createKeyHandoverTaskDto: CreateKeyHandoverTaskDto) {
    return 'This action adds a new keyHandoverTask';
  }

  findAll() {
    return `This action returns all keyHandoverTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} keyHandoverTask`;
  }

  update(id: number, updateKeyHandoverTaskDto: UpdateKeyHandoverTaskDto) {
    return `This action updates a #${id} keyHandoverTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} keyHandoverTask`;
  }
}
