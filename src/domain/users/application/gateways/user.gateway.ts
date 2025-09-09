import { CoreGateway } from '@/core/gateway/core.gateway'
import { GetProfileOutputDto } from '@/domain/dto/user/get-profile.dto'
import { User } from '@/domain/users/enterprise/entities/user.entity'

export interface UserGateway extends CoreGateway<User> { 
  getCurrentUser(user_id: string): Promise<GetProfileOutputDto | null>
  findByEmail(email: string): Promise<User | null>
}