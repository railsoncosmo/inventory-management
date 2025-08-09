import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity('users_tokens')
export class Token {

  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ type: 'varchar' })
    refresh_token: string

  @Column('uuid')
    user_id: string

  @Column({ type: 'timestamp' })
    expires_date: Date

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
    created_at: Date
  
  @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
    user: User
}