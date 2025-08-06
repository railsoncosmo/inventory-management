import { Repository } from 'typeorm'
import { Token } from '../../core/domain/entities/token/token.entity'
import { Token as TokenOrm } from '../database/typeorm/entities/Token'
import { TokenGateway } from '../../core/domain/entities/token/token.gateway'

export class TokenTypeormRepository implements TokenGateway {
  private constructor(private readonly tokenRepository: Repository<TokenOrm>) {}

  public static build(tokenRepository: Repository<TokenOrm>) {
    return new TokenTypeormRepository(tokenRepository)
  }

  async create(token: Token): Promise<Token> {
    const data = {
      id: token.id,
      user_id: token.user_id,
      expires_date: token.expires_date,
      refresh_token: token.refresh_token
    }

    const newToken = this.tokenRepository.create(data)
    await this.tokenRepository.save(newToken)
    return Token.withToken(newToken)
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<Token | null> {
    const userToken = await this.tokenRepository.findOne({
      where: {
        user_id,
        refresh_token,
      }
    })
    if (!userToken) return null
    return Token.withToken(userToken)
  }

  async deleteByTokenId(id: string): Promise<void> {
    await this.tokenRepository.delete(id)
  }

  async deleteAllByUserId(user_id: string): Promise<void> {
    await this.tokenRepository.delete({ user_id })
  }
}