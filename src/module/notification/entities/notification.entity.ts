import { Employee } from 'src/module/employee/entities/employee.entity';
import { Users } from 'src/module/users/Entyties/users.entity';
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

export enum RecipientType {
  USER = 'user',
  EMPLOYEE = 'employee',
}

export enum NotificationType {
  EMAIL = 'email',
  WHATSAPP = 'whatsapp',
  PUSH = 'push',
}

export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
  READ = 'read',
}

@Entity('notifications')
@Index(['user'])
@Index(['employee'])
@Index(['status'])
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: RecipientType,
  })
  recipientType: RecipientType;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  notificationType: NotificationType;

  @Column({ type: 'varchar', length: 100, nullable: true })
  relatedEntityType?: string;

  @Column({ type: 'uuid', nullable: true })
  relatedEntityId?: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.PENDING,
  })
  status: NotificationStatus;

  @Column({ type: 'timestamp', nullable: true })
  sentAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  readAt?: Date;

  @Column({ type: 'text', nullable: true })
  errorMessage?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Users, (user) => user.notifications, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: Users;

  @ManyToOne(() => Employee, (employee) => employee.notifications, {
    nullable: true,
  })
  @JoinColumn({ name: 'employee_id' })
  employee?: Employee;
}
