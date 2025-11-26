import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CleaningTaskService } from './cleaning_task.service';
import { CreateCleaningTaskDto } from './dto/create-cleaning_task.dto';
import { UpdateCleaningTaskDto } from './dto/update-cleaning_task.dto';

@Controller('cleaning-task')
export class CleaningTaskController {
  constructor(private readonly cleaningTaskService: CleaningTaskService) {}

  @Post()
  create(@Body() createCleaningTaskDto: CreateCleaningTaskDto) {
    return this.cleaningTaskService.create(createCleaningTaskDto);
  }

  @Get()
  findAll() {
    return this.cleaningTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cleaningTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCleaningTaskDto: UpdateCleaningTaskDto) {
    return this.cleaningTaskService.update(+id, updateCleaningTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cleaningTaskService.remove(+id);
  }
}
