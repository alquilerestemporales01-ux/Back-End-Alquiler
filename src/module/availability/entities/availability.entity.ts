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

@Entity('availabilities')
@Index(['property', 'date'])
@Unique(['property', 'date'])
export class Availability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  customPrice?: number;

  @Column({ type: 'int', default: 1 })
  minimumDay: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Property, (property) => property.availabilities)
  @JoinColumn({ name: 'property_id' })
  property: Property;
}
