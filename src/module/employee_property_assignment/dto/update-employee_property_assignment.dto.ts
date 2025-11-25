import { PartialType } from '@nestjs/swagger';
import { CreateEmployeePropertyAssignmentDto } from './create-employee_property_assignment.dto';

export class UpdateEmployeePropertyAssignmentDto extends PartialType(CreateEmployeePropertyAssignmentDto) {}
