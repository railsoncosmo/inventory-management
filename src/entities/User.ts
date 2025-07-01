import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../shared/types/user.type';

@Entity('users')
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: number;

  @Column()
  image_url: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER})
  role: string;

  @CreateDateColumn()
  createdAt: Date;
}