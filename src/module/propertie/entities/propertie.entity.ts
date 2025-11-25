import { Availability } from 'src/module/availability/entities/availability.entity';
import { Booking } from 'src/module/booking/entities/booking.entity';
import { CleaningTask } from 'src/module/cleaning_task/entities/cleaning_task.entity';
import { EmployeePropertyAssignment } from 'src/module/employee_property_assignment/entities/employee_property_assignment.entity';
import { KeyHandoverTask } from 'src/module/key_handover_task/entities/key_handover_task.entity';
import { PropertyImage } from 'src/module/propertie_image/entities/propertie_image.entity';
import { Review } from 'src/module/review/entities/review.entity';
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
}

@Entity('properties')
@Index(['latitude', 'longitude'])
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: PropertyType,
  })
  propertyType: PropertyType;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  state: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 20 })
  postalCode: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude?: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude?: number;

  @Column({ type: 'int' })
  bedrooms: number;

  @Column({ type: 'int' })
  bathrooms: number;

  @Column({ type: 'int' })
  maxGuest: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  squareMeters: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerDay: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  cleaningFee?: number;

  @Column({ type: 'jsonb', nullable: true })
  amenities?: object;

  @Column({ type: 'text', nullable: true })
  houseRules?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToMany(() => PropertyImage, (image) => image.property)
  images: PropertyImage[];

  @OneToMany(() => Review, (review) => review.property)
  reviews: Review[];

  @OneToMany(() => Availability, (availability) => availability.property)
  availabilities: Availability[];

  @OneToMany(() => Booking, (booking) => booking.property)
  bookings: Booking[];

  @OneToMany(() => CleaningTask, (task) => task.property)
  cleaningTasks: CleaningTask[];

  @OneToMany(() => KeyHandoverTask, (task) => task.property)
  keyHandoverTasks: KeyHandoverTask[];

  @OneToMany(() => EmployeePropertyAssignment, (assignment) => assignment.property)
  employeeAssignments: EmployeePropertyAssignment[];
}
