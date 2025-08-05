import { AuthUserOutputDto } from '../application/dto/user/auth-user.dto'
import { RefreshTokenOutputDto } from '../application/dto/user/create-user-token.dto'
import { UserPresenters } from '../application/presenter/user.present'

export class CreateUserHttpPresenters implements UserPresenters {
  presentAuthUser(token: string, refresh_token: string): Promise<AuthUserOutputDto> {
    return Promise.resolve({ token, refresh_token })
  }

  presentRefreshToken({ refresh_token }: RefreshTokenOutputDto): Promise<RefreshTokenOutputDto> {
    return Promise.resolve({ refresh_token })
  }
}