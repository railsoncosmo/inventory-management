import { UserGateway } from '@/domain/users/application/gateways/user.gateway'
import { User } from '@/domain/users/enterprise/entities/user.entity'
import { GetProfileOutputDto } from '@/domain/dto/user/get-profile.dto'

export class InMemoryUsersRepository implements UserGateway {
  public user: User[] = []
  
  async save(user: User): Promise<void> {
    this.user.push(user)
  }

  async find(email: string): Promise<User | null> {
    const user = this.user.find(doc => doc.email === email)
    return user ?? null
  }

  async countByEmail(email: string): Promise<number> {
    return this.user.filter(doc => doc.email === email).length
  }

  async getCurrentUser(user_id: string): Promise<GetProfileOutputDto | null> {
    const user = this.user.find(doc => doc.id.toString() === user_id)
    if(!user) return null
    return user.asPublic()
  }
}