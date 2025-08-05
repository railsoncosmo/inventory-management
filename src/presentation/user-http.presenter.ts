import { AuthUserOutputDto } from '../application/dto/user/auth-user.dto'
import { UserPresenters } from '../application/presenter/user.present'

export class CreateUserHttpPresenters implements UserPresenters {
  presentAuthUser(token: string, refreshToken: string): Promise<AuthUserOutputDto> {
    return Promise.resolve({ token, refreshToken })
  }
}