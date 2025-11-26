import { Employee } from 'src/module/employee/entities/employee.entity';
import { Property } from 'src/module/propertie/entities/propertie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('employee_property_assignments')
@Unique(['employee', 'property'])
@Index(['employee'])
@Index(['property'])
export class EmployeePropertyAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Employee, (employee) => employee.propertyAssignments)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => Property, (property) => property.employeeAssignments)
  @JoinColumn({ name: 'property_id' })
  property: Property;
}
