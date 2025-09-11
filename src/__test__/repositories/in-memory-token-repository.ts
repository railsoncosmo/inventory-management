import { TokenGateway } from '@/domain/sub-domains/application/gateways/token.gateway'
import { Token } from '@/domain/sub-domains/enterprise/entities/token.entity'

export class InMemoryTokenRepository implements TokenGateway {
  public token: Token[] = []
  
  async create(token: Token): Promise<Token> {
    this.token.push(token)
    return token
  }

  async findByUserIdAndRefreshToken(user_id: string): Promise<Token | null> {
    const user = this.token.find(user => user.user_id === user_id)
    return user ?? null
  }

  async deleteByTokenId(id: string): Promise<void> {
    this.token = this.token.filter(token_id => token_id.id !== id)
  }

  async deleteAllByUserId(user_id: string): Promise<void> {
    this.token = this.token.filter(token_id => token_id.user_id !== user_id)
  }
}