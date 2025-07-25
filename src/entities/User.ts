import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { UserRole } from '../enums/roles'
import { Transaction } from './Transaction'
import { Product } from './Product'

@Entity('users')
export class User {
  
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
    name: string

  @Column({ unique: true })
    email: string

  @Column()
    password: string

  @Column()
    phone: string

  @Column({ nullable: true })
    image_url: string

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole

  @CreateDateColumn()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date

  @OneToMany(() => Product, (product) => product.user)
    products: Product[]

  @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions: Transaction[]
}