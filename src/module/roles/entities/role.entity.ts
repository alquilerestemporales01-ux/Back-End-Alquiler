import { Employee } from 'src/module/employee/entities/employee.entity';
import { Users } from 'src/module/users/Entyties/users.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'role',
})
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  permissions: object;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToMany(() => Employee, (employee) => employee.role)
  employees: Employee[];

  @OneToMany(() => Users, (user) => user.role)
  users: Users[];
}
