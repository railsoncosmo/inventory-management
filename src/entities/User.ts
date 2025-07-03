import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../shared/types/user.type';
import { Transaction } from './Transaction';

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

  @Column({ nullable: true })
  image_url: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER})
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions: Transaction[];
}