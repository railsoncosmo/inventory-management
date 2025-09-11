import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Product } from './Product'

@Entity('categories')
export class Category {

  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ unique: true })
    name: string

  @Column('varchar')
    displayName: string

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
    created_at: Date
  
  @UpdateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
    updated_at: Date

  @OneToMany(() => Product, (product) => product.category)
    products: Product[]
}