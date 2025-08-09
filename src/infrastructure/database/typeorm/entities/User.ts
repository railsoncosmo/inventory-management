import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { UserRole } from '@/domain/enums/roles'
import { Transaction } from './Transaction'
import { Product } from './Product'
import { Token } from './Token'

@Entity('users')
export class User {
  
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column('varchar')
    name: string

  @Column({ unique: true, type: 'varchar' })
    email: string

  @Column('varchar', { length: 255 })
    password: string

  @Column({ type: 'varchar', length: 11 })
    phone: string

  @Column({ nullable: true, type: 'text' })
    image_url: string

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
    created_at: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
    updated_at: Date

  @OneToMany(() => Product, (product) => product.user)
    products: Product[]

  @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions: Transaction[]

  @OneToMany(() => Token, (product) => product.user_id)
    tokens: Token[]
}