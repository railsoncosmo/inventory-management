import { User } from '../../entities/user/user.entity'

export interface UserGateway {
  save(user: User): Promise<void>
  findByEmail(email: string): Promise<User | null> 
  countByEmail(email: string): Promise<number>
}