import { Booking } from 'src/module/booking/entities/booking.entity';
import { Property } from 'src/module/propertie/entities/propertie.entity';
import { Users } from 'src/module/users/Entyties/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reviews')
@Index(['property'])
@Index(['user'])
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  rating: number; // 1-5

  @Column({ type: 'int', nullable: true })
  cleanlinessRating?: number;

  @Column({ type: 'int', nullable: true })
  accuracyRating?: number;

  @Column({ type: 'int', nullable: true })
  communicationRating?: number;

  @Column({ type: 'int', nullable: true })
  locationRating?: number;

  @Column({ type: 'int', nullable: true })
  valueRating?: number;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'boolean', default: true })
  isVisible: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Users, (user) => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Property, (property) => property.reviews)
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @OneToOne(() => Booking, (booking) => booking.review)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;
}
