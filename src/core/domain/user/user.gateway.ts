import { User } from '@/core/domain/user/user.entity'

export interface UserGateway {
  save(user: User): Promise<void>
}