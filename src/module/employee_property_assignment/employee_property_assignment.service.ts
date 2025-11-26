import { Injectable } from '@nestjs/common';
import { CreateEmployeePropertyAssignmentDto } from './dto/create-employee_property_assignment.dto';
import { UpdateEmployeePropertyAssignmentDto } from './dto/update-employee_property_assignment.dto';

@Injectable()
export class EmployeePropertyAssignmentService {
  create(createEmployeePropertyAssignmentDto: CreateEmployeePropertyAssignmentDto) {
    return 'This action adds a new employeePropertyAssignment';
  }

  findAll() {
    return `This action returns all employeePropertyAssignment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeePropertyAssignment`;
  }

  update(id: number, updateEmployeePropertyAssignmentDto: UpdateEmployeePropertyAssignmentDto) {
    return `This action updates a #${id} employeePropertyAssignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeePropertyAssignment`;
  }
}
