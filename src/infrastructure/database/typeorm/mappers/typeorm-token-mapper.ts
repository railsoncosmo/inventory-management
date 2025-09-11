import { Token } from '@/domain/sub-domains/enterprise/entities/token.entity'
import { Token as TokenOrm } from '../entities/Token'
import { UniqueEntityId } from '@/domain/sub-domains/enterprise/value-objects/unique-entity-id'

export class TypeormTokenMapper {
  static toDomain(raw: TokenOrm): Token {
    return Token.create({
      expires_date: raw.expires_date,
      refresh_token: raw.refresh_token,
      user_id: raw.user_id,
    }, new UniqueEntityId(raw.id))
  }
}