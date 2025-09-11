import { CreateTokenDto } from '@/domain/dto/user/token-user.dto'
import { Token } from '@/domain/sub-domains/enterprise/entities/token.entity'

export interface TokenGateway {
  create({user_id, refresh_token, expires_date}: CreateTokenDto): Promise<Token>
  findByUserIdAndRefreshToken(user_id: string): Promise<Token | null>
  deleteByTokenId(id: string): Promise<void>
  deleteAllByUserId(user_id: string): Promise<void>
}