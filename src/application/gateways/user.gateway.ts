import { User } from '@/domain/entities/user.entity'

export interface UserGateway {
  save(user: User): Promise<void>
  find(email: string): Promise<User | null> 
  countByEmail(email: string): Promise<number>
}