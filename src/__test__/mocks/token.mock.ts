import { FakeHasher } from '../fakes/fake-hash'
import { Token } from '@/domain/users/enterprise/entities/token.entity'


export async function makeToken(
  hasher: FakeHasher,
  override: Partial<{
    id: string
    user_id: string
    expires_date: Date
    refresh_token: string
    created_at: Date
  }> = {}
) {

  const hashedRefreshToken = await hasher.hash(override.refresh_token || '123123')
  
  const tokenData = {
    user_id: override.user_id || 'user-id-test',
    expires_date: override.expires_date || new Date(),
    refresh_token: hashedRefreshToken,
    created_at: override.created_at || new Date()
  }
  
  return Token.create(tokenData)
}
