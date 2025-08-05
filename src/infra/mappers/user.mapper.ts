import { GetProfileOutputDTO } from '../../application/dto/user/get-profile.dto'
import { User } from '../database/typeorm/entities/User'

export class UserMapper {
  static userProfileDTO(user: User): GetProfileOutputDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      image_url: user.image_url,
      role: user.role,
      created_at: user.created_at
    }
  }
}