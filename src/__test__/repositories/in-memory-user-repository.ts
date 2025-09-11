import { UserGateway } from '@/domain/sub-domains/application/gateways/user.gateway'
import { User } from '@/domain/sub-domains/enterprise/entities/user.entity'
import { GetProfileOutputDto } from '@/domain/dto/user/get-profile.dto'
import { NotFoundError } from '@/domain/errors/not-found-error'

export class InMemoryUsersRepository implements UserGateway {
  public users: User[] = []
  
  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(doc => doc.email === email)
    return user ?? null
  }

  async countBy(email: string): Promise<number> {
    return this.users.filter(doc => doc.email === email).length
  }

  async getCurrentUser(user_id: string): Promise<GetProfileOutputDto | null> {
    const user = this.users.find(doc => doc.id.toString() === user_id)
    if(!user) return null
    return user.asPublic()
  }

  async findAll(): Promise<User[]> {
    const users = this.users.map(user => user)

    return users
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id)
    return user ?? null
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex === -1) {
      throw new NotFoundError('Usuário não encontrado')
    }

    const user = this.users[userIndex]
    const updatedUser = Object.assign(user, {
      ...data
    })

    this.users[userIndex] = updatedUser
    return updatedUser
  }

  async delete(id: string): Promise<void> {
    this.users.filter(doc => doc.id !== id)
  }
}