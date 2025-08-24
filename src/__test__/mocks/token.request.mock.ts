import { CreateTokenDto } from '@/domain/dto/user/token-user.dto'
import { faker } from '@faker-js/faker'

export const mockToken = (payload?: CreateTokenDto): CreateTokenDto => {
  const { user_id, expires_date, refresh_token } = payload ?? {}

  const token: CreateTokenDto = {
    user_id: user_id ?? faker.string.uuid(),
    expires_date: expires_date ?? faker.date.anytime(),
    refresh_token: refresh_token ?? faker.internet.jwt()
  }
  return token
}