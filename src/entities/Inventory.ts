import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../entities/Product';

@Entity('inventories')
export class Inventory {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_id', unique: true })
  product_id: string;

  @OneToOne(() => Product, (product) => product.inventory)
  @JoinColumn({ name: 'product_id'})
  product: Product;

  @Column()
  quantity: number;

  @Column()
  updatedAt: Date;
}