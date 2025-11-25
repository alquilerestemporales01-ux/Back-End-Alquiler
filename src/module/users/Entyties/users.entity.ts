import { Booking } from 'src/module/booking/entities/booking.entity';
import { Notification } from 'src/module/notification/entities/notification.entity';
import { Payment } from 'src/module/payments/entities/payment.entity';
import { Review } from 'src/module/review/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'user',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @Column({ type: 'date', nullable: false })
  birthdate: Date;

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

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];
}
