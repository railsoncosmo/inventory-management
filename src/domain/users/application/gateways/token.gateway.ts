import { CreateUserTokenDto } from '@/domain/dto/user/create-user-token.dto'
import { Token } from '@/domain/users/enterprise/entities/token.entity'

export interface TokenGateway {
  create({ expires_date, refresh_token, user_id }: CreateUserTokenDto): Promise<Token>
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<Token | null>
  deleteByTokenId(id: string): Promise<void>
  deleteAllByUserId(user_id: string): Promise<void>
}