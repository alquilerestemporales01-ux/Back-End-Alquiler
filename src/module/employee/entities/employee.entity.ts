import { CleaningTask } from 'src/module/cleaning_task/entities/cleaning_task.entity';
import { EmployeePropertyAssignment } from 'src/module/employee_property_assignment/entities/employee_property_assignment.entity';
import { KeyHandoverTask } from 'src/module/key_handover_task/entities/key_handover_task.entity';
import { Notification } from 'src/module/notification/entities/notification.entity';
import { Role } from 'src/module/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'employee',
})
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  employee_code: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  username: string;

  @Column('text', { nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  phone: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: Date | null;

  @ManyToOne(() => Role, (role) => role.employees)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => CleaningTask, (task) => task.employee)
  cleaningTasks: CleaningTask[];

  @OneToMany(() => KeyHandoverTask, (task) => task.assignedToEmployee)
  keyHandoverTasks: KeyHandoverTask[];

  @OneToMany(() => Notification, (notification) => notification.employee)
  notifications: Notification[];

  @OneToMany(() => EmployeePropertyAssignment, (assignment) => assignment.employee)
  propertyAssignments: EmployeePropertyAssignment[];
}
