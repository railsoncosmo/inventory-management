import { CreateUserOutputDto } from '../../../application/dto/create-user.dto'
import { CreateUserPresenters } from '../../../application/presenter/user.present'
import { User } from '../../../core/domain/entities/user/user.entity'

export class CreateUserHttpPresenters implements CreateUserPresenters {
  present(user: User): CreateUserOutputDto {
    return {
      id: user.id
    }
  }
}