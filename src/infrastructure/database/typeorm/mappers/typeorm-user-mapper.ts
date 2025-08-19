import { User } from '@/domain/users/enterprise/entities/user.entity'
import { User as UserOrm } from '../entities/User'
import { UniqueEntityId } from '@/domain/users/enterprise/entities/value-objects/unique-entity-id'
import { Email } from '@/domain/users/enterprise/entities/value-objects/email'
import { Role } from '@/domain/users/enterprise/entities/value-objects/role'
import { GetProfileOutputDto } from '@/domain/dto/user/get-profile.dto'

export class TypeormUserMapper {
  static toDomain(raw: UserOrm): User {
    return User.create({
      name: raw.name,
      email: new Email(raw.email),
      password: raw.password,
      phone: raw.phone,
      role: new Role(raw.role),
      image_url: raw.image_url,
      created_at: raw.created_at,
      updated_at: raw.updated_at
    }, new UniqueEntityId(raw.id))
  }

  static toUserPublic(raw: UserOrm): GetProfileOutputDto {
    return {
      id: new UniqueEntityId(raw.id).toValue(),
      name: raw.name,
      email: raw.email,
      phone: raw.phone,
      role: raw.role,
      image_url: raw.image_url,
      created_at: raw.created_at,
    }
  }
}