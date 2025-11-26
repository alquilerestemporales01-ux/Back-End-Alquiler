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

export enum KeyHandoverTaskType {
  CHECK_IN = 'check_in',
  CHECK_OUT = 'check_out',
}

export enum KeyHandoverStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  MISSED = 'missed',
}

@Entity('key_handover_tasks')
@Index(['assignedToEmployee'])
@Index(['property'])
@Index(['scheduledDate'])
export class KeyHandoverTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: KeyHandoverTaskType,
  })
  taskType: KeyHandoverTaskType;

  @Column({ type: 'date' })
  scheduledDate: Date;

  @Column({ type: 'time' })
  scheduledTime: string;

  @Column({ type: 'varchar', length: 255 })
  guestName: string;

  @Column({ type: 'varchar', length: 50 })
  guestPhone: string;

  @Column({
    type: 'enum',
    enum: KeyHandoverStatus,
    default: KeyHandoverStatus.PENDING,
  })
  status: KeyHandoverStatus;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ type: 'timestamp', nullable: true })
  completedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Booking, (booking) => booking.keyHandoverTasks)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @ManyToOne(() => Property, (property) => property.keyHandoverTasks)
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @ManyToOne(() => Employee, (employee) => employee.keyHandoverTasks)
  @JoinColumn({ name: 'assigned_to_employee_id' })
  assignedToEmployee: Employee;
}
