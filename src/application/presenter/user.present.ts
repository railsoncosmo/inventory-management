import { User } from '../../core/domain/entities/user/user.entity'
import { CreateUserOutputDto } from '../dto/create-user.dto'

export interface CreateUserPresenters {
  present(user: User): CreateUserOutputDto
}