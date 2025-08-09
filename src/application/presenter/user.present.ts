import { AuthUserOutputDto } from '../dto/user/auth-user.dto'
import { RefreshTokenOutputDto } from '../dto/user/create-user-token.dto'

export interface UserPresenters {
  presentAuthUser(token: string, refresh_token: string): Promise<AuthUserOutputDto>
  presentRefreshToken({ refresh_token }: RefreshTokenOutputDto): Promise<RefreshTokenOutputDto>
}