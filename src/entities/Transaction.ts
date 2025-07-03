import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeTransaction } from '../shared/types/transaction';
import { Product } from './Product';
import { User } from './User';

@Entity('transactions')
export class Transaction {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: string;

  @Column()
  quantity: number;

  @Column({ type: 'enum', enum: TypeTransaction })
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.transactions)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: Product;
}