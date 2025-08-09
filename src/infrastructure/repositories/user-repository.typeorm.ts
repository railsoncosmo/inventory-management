import { Repository } from 'typeorm'
import { User } from '@/domain/entities/user.entity'
import { UserRole } from '@/domain/enums/roles'
import { UserGateway } from '@/application/gateways/user.gateway'
import { User as UserORM } from '../database/typeorm/entities/User'

export class UserTypeormRepository implements UserGateway {
  constructor(private readonly userRepository: Repository<UserORM>) {}

  public static build(userRepository: Repository<UserORM>) {
    return new UserTypeormRepository(userRepository)
  }

  async save(user: User): Promise<void> {
    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      role: user.role as UserRole,
    }

    const newUser = this.userRepository.create(data)
    await this.userRepository.save(newUser)
  }

  async countByEmail(email: string): Promise<number> {
    return await this.userRepository.count({ 
      where: { 
        email 
      } 
    })
  }

  async find(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ 
      where: { 
        email 
      } 
    })
    if (!user) return null
    return User.withUser(user)
  }
}
