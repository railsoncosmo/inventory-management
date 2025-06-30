import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('products')
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  category_id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: string;

  @Column()
  image_url: string;

  @Column()
  createdAt: Date;;
}