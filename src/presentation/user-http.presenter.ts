import { AuthUserOutputDto } from '@/domain/dto/user/auth-user.dto'
import { RefreshTokenOutputDto } from '@/domain/dto/user/create-user-token.dto'
import { GetProfileOutputDto } from '@/domain/dto/user/get-profile.dto'
import { UserPresenters } from '@/domain/ports/in/user.present'

export class UserHttpPresenters implements UserPresenters {
  presentAuthUser(token: string, refresh_token: string): Promise<AuthUserOutputDto> {
    return Promise.resolve({ token, refresh_token })
  }

  presentRefreshToken({ refresh_token }: RefreshTokenOutputDto): Promise<RefreshTokenOutputDto> {
    return Promise.resolve({ refresh_token })
  }

  presentCurrentProfile(user: GetProfileOutputDto): Promise<GetProfileOutputDto> {
    return Promise.resolve(user)
  }
}