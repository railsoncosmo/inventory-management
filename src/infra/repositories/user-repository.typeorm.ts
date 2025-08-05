import { Repository } from 'typeorm'
import { User as UserORM } from '../database/typeorm/entities/User'
import { User } from '../../core/domain/entities/user/user.entity'
import { UserGateway } from '../../core/domain/entities/user/user.gateway'
import { UserRole } from '../../core/domain/enums/roles'
//import { UserMapper } from '../mappers/user.mapper'

export class UserTypeormRepository implements UserGateway {
  constructor(private readonly repository: Repository<UserORM>) {}

  public static build(repository: Repository<UserORM>) {
    return new UserTypeormRepository(repository)
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

    const newUser = this.repository.create(data)
    await this.repository.save(newUser)
  }

  async countByEmail(email: string): Promise<number> {
    return await this.repository.count({ 
      where: { 
        email 
      } 
    })
  }

  async find(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ 
      where: { 
        email 
      } 
    })
    if (!user) return null
    return User.withUser(user)
  }

  // async getUserProfile(userId: string): Promise<User  | null> {
  //   const user = await this.repository.findOne({ 
  //     where: { 
  //       id: userId 
  //     } 
  //   })
  //   if (!user) return null
  //   return UserMapper.userProfileDTO(user)
  // }
}
