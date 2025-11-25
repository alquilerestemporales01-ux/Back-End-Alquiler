import { CleaningTask } from 'src/module/cleaning_task/entities/cleaning_task.entity';
import { KeyHandoverTask } from 'src/module/key_handover_task/entities/key_handover_task.entity';
import { Payment } from 'src/module/payments/entities/payment.entity';
import { Property } from 'src/module/propertie/entities/propertie.entity';
import { Review } from 'src/module/review/entities/review.entity';
import { Users } from 'src/module/users/Entyties/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CHECKED_IN = 'checked_in',
  CHECKED_OUT = 'checked_out',
  CANCELLED = 'cancelled',
}

@Entity('bookings')
@Index(['property'])
@Index(['user'])
@Index(['checkIn', 'checkOut'])
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  bookingNumber: string;

  @Column({ type: 'date' })
  checkIn: Date;

  @Column({ type: 'date' })
  checkOut: Date;

  @Column({ type: 'time', default: '15:00:00' })
  checkInTime: string;

  @Column({ type: 'time', default: '11:00:00' })
  checkOutTime: string;

  @Column({ type: 'int' })
  numGuests: number;

  @Column({ type: 'int' })
  totalDays: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerDay: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column({ type: 'text', nullable: true })
  cancellationsReason?: string;

  @Column({ type: 'text', nullable: true })
  specialRequests?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToOne(() => Review, (review) => review.booking, { nullable: true })
  review?: Review;

  @ManyToOne(() => Property, (property) => property.bookings)
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @ManyToOne(() => Users, (user) => user.bookings)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToOne(() => Payment, (payment) => payment.booking, { nullable: true })
  payment?: Payment;

  @OneToMany(() => CleaningTask, (task) => task.booking)
  cleaningTasks: CleaningTask[];

  @OneToMany(() => KeyHandoverTask, (task) => task.booking)
  keyHandoverTasks: KeyHandoverTask[];
}
