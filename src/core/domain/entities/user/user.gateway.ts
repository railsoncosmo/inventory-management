import { User } from '../../entities/user/user.entity'

export interface UserGateway {
  save(user: User): Promise<void>
  countByEmail(email: string): Promise<number>
}