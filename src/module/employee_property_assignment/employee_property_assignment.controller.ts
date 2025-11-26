import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeePropertyAssignmentService } from './employee_property_assignment.service';
import { CreateEmployeePropertyAssignmentDto } from './dto/create-employee_property_assignment.dto';
import { UpdateEmployeePropertyAssignmentDto } from './dto/update-employee_property_assignment.dto';

@Controller('employee-property-assignment')
export class EmployeePropertyAssignmentController {
  constructor(private readonly employeePropertyAssignmentService: EmployeePropertyAssignmentService) {}

  @Post()
  create(@Body() createEmployeePropertyAssignmentDto: CreateEmployeePropertyAssignmentDto) {
    return this.employeePropertyAssignmentService.create(createEmployeePropertyAssignmentDto);
  }

  @Get()
  findAll() {
    return this.employeePropertyAssignmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeePropertyAssignmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeePropertyAssignmentDto: UpdateEmployeePropertyAssignmentDto) {
    return this.employeePropertyAssignmentService.update(+id, updateEmployeePropertyAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeePropertyAssignmentService.remove(+id);
  }
}
