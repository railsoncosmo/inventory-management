import { AuthUserOutputDto } from '../dto/user/auth-user.dto'
//import { GetProfileOutputDTO } from '../dto/user/get-profile.dto'

export interface UserPresenters {
  presentAuthUser(token: string, refreshToken: string): Promise<AuthUserOutputDto>
  //presentProfileUser(user: GetProfileOutputDTO): Promise<GetProfileOutputDTO>
}