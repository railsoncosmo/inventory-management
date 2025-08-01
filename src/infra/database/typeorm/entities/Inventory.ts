import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Product } from './Product'

@Entity('inventories')
export class Inventory {

  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ name: 'product_id', unique: true })
    product_id: string

  @OneToOne(() => Product, (product) => product.inventory)
  @JoinColumn({ name: 'product_id'})
    product: Product

  @Column('bigint')
    quantity: number

  @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date
}