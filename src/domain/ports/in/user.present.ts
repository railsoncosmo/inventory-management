import { AuthUserOutputDto } from '@/domain/dto/user/auth-user.dto'
import { RefreshTokenOutputDto } from '@/domain/dto/user/token-user.dto'
import { GetProfileOutputDto } from '@/domain/dto/user/get-profile.dto'
import { User } from '@/domain/users/enterprise/entities/user.entity'

export interface UserPresenters {
  presentAuthUser(token: string, refresh_token: string): Promise<AuthUserOutputDto>
  presentRefreshToken({ refresh_token }: RefreshTokenOutputDto): Promise<RefreshTokenOutputDto>
  presentCurrentProfile(user: User): Promise<GetProfileOutputDto>
}