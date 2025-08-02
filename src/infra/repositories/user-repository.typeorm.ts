import { Repository } from 'typeorm'
import { User as UserORM } from '../database/typeorm/entities/User'
import { User } from '../../core/domain/entities/user/user.entity'
import { UserGateway } from '../../core/domain/entities/user/user.gateway'
import { UserRole } from '../../core/domain/enums/roles'

export class UserTypeormRepository implements UserGateway {
  private constructor(private readonly typeOrmClient: Repository<UserORM>) {}

  public static create(typeOrmClient: Repository<UserORM>) {
    return new UserTypeormRepository(typeOrmClient)
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

    const newUser = this.typeOrmClient.create(data)
    await this.typeOrmClient.save(newUser)
  }

  async countByEmail(email: string): Promise<number> {
    return await this.typeOrmClient.count({ where: { email } })
  }
}
