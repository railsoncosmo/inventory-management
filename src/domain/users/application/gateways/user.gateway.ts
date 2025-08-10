import { GetProfileOutputDto } from '@/domain/dto/user/get-profile.dto'
import { User } from '@/domain/users/enterprise/entities/user.entity'

export interface UserGateway {
  save(user: User): Promise<void>
  find(email: string): Promise<User | null> 
  countByEmail(email: string): Promise<number>
  getCurrentUser(user_id: string): Promise<GetProfileOutputDto | null>
}