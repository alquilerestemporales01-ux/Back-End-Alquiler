import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KeyHandoverTaskService } from './key_handover_task.service';
import { CreateKeyHandoverTaskDto } from './dto/create-key_handover_task.dto';
import { UpdateKeyHandoverTaskDto } from './dto/update-key_handover_task.dto';

@Controller('key-handover-task')
export class KeyHandoverTaskController {
  constructor(private readonly keyHandoverTaskService: KeyHandoverTaskService) {}

  @Post()
  create(@Body() createKeyHandoverTaskDto: CreateKeyHandoverTaskDto) {
    return this.keyHandoverTaskService.create(createKeyHandoverTaskDto);
  }

  @Get()
  findAll() {
    return this.keyHandoverTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keyHandoverTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKeyHandoverTaskDto: UpdateKeyHandoverTaskDto) {
    return this.keyHandoverTaskService.update(+id, updateKeyHandoverTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keyHandoverTaskService.remove(+id);
  }
}
