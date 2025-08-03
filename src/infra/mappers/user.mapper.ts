import { User } from '../../core/domain/entities/user/user.entity'
import { User as UserORM } from '../database/typeorm/entities/User'

export class UserMapper {
  public static toDomain(user: UserORM): User {
    return User.userAuth({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      image_url: user.image_url,
      role: user.role,
    })
  }
}