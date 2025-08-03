import { AuthUserOutputDto } from '../dto/user/auth-user.dto'

export interface UserPresenters {
  presentAuthUser(token: string): Promise<AuthUserOutputDto>
}