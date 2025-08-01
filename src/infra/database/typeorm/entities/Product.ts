import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Category } from './Category'
import { Inventory } from './Inventory'
import { Transaction } from './Transaction'
import { User } from './User'

@Entity('products')
export class Product {

  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column('varchar')
    name: string

  @Column({ nullable: true })
    description: string

  @Column('decimal', { precision: 10, scale: 2 })
    price: string

  @Column({ nullable: true, type: 'text' })
    image_url: string

  @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'user_id' })
    user: User

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
    category: Category

  @OneToOne(() => Inventory, (inventory) => inventory.product)
  @JoinColumn({ name: 'id' })
    inventory: Inventory

  @OneToMany(() => Transaction, (transactions) => transactions.product)
    transactions: Transaction[]
}