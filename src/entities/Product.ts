import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './Category';
import { Inventory } from './Inventory';

@Entity('products')
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: string;

  @Column()
  image_url: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToOne(() => Inventory, (inventory) => inventory.product)
  @JoinColumn({ name: 'id' })
  inventory: Inventory;
}