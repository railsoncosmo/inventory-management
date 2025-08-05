import { User } from '../../entities/user/user.entity'

export interface UserGateway {
  save(user: User): Promise<void>
  find(email: string): Promise<User | null> 
  countByEmail(email: string): Promise<number>
  //getUserProfile(userId: string): Promise<User | null>
}