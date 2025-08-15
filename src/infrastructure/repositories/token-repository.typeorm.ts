import { Repository } from 'typeorm'
import { Token } from '@/domain/users/enterprise/entities/token.entity'
import { TokenGateway } from '@/domain/users/application/gateways/token.gateway'
import { Token as TokenOrm } from '@/infrastructure/database/typeorm/entities/Token'
import { TypeormTokenMapper } from '../database/typeorm/mappers/typeorm-token-mapper'

export class TokenTypeormRepository implements TokenGateway {
  private constructor(private readonly tokenRepository: Repository<TokenOrm>) {}

  public static build(tokenRepository: Repository<TokenOrm>) {
    return new TokenTypeormRepository(tokenRepository)
  }

  async create({ user_id, expires_date, refresh_token }: Token): Promise<Token> {
    const data = {
      user_id,
      expires_date,
      refresh_token,
    }

    const newToken = this.tokenRepository.create(data)
    await this.tokenRepository.save(newToken)
    return TypeormTokenMapper.toDomain(newToken)
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<Token | null> {
    const userToken = await this.tokenRepository.findOne({
      where: {
        user_id: user_id,
        refresh_token,
      }
    })
    if (!userToken) return null
    return TypeormTokenMapper.toDomain(userToken)
  }

  async deleteByTokenId(id: string): Promise<void> {
    await this.tokenRepository.delete(id)
  }

  async deleteAllByUserId(user_id: string): Promise<void> {
    await this.tokenRepository.delete({user_id})
  }
}