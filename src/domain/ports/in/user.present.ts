import { AuthUserOutputDto } from '@/domain/dto/user/auth-user.dto'
import { RefreshTokenOutputDto } from '@/domain/dto/user/create-user-token.dto'
import { GetProfileOutputDto } from '@/domain/dto/user/get-profile.dto'

export interface UserPresenters {
  presentAuthUser(token: string, refresh_token: string): Promise<AuthUserOutputDto>
  presentRefreshToken({ refresh_token }: RefreshTokenOutputDto): Promise<RefreshTokenOutputDto>
  presentCurrentProfile(user: GetProfileOutputDto): Promise<GetProfileOutputDto>
}