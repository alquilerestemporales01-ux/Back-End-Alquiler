import { Booking } from 'src/module/booking/entities/booking.entity';
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
  UpdateDateColumn,
} from 'typeorm';

export enum TaskType {
  CHECK_IN_PREP = 'check_in_prep',
  CHECK_OUT_CLEANUP = 'check_out_cleanup',
  MAINTENANCE = 'maintenance',
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('cleaning_tasks')
@Index(['employee'])
@Index(['property'])
@Index(['scheduledDate'])
export class CleaningTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  scheduledDate: Date;

  @Column({ type: 'time' })
  scheduledTime: string;

  @Column({
    type: 'enum',
    enum: TaskType,
  })
  taskType: TaskType;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ type: 'timestamp', nullable: true })
  completedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Booking, (booking) => booking.cleaningTasks, {
    nullable: true,
  })
  @JoinColumn({ name: 'booking_id' })
  booking?: Booking;

  @ManyToOne(() => Property, (property) => property.cleaningTasks)
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @ManyToOne(() => Employee, (employee) => employee.cleaningTasks)
  @JoinColumn({ name: 'assigned_to_employee_id' })
  employee: Employee;
}
