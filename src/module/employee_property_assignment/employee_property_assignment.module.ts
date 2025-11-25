import { Module } from '@nestjs/common';
import { EmployeePropertyAssignmentService } from './employee_property_assignment.service';
import { EmployeePropertyAssignmentController } from './employee_property_assignment.controller';

@Module({
  controllers: [EmployeePropertyAssignmentController],
  providers: [EmployeePropertyAssignmentService],
})
export class EmployeePropertyAssignmentModule {}
