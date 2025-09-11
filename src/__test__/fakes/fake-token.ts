import { AccessTokenPayload, RefreshTokenPayload } from '@/core/types/base-token'
import { TokenProvider } from '@/domain/interfaces/token'

export class FakeTokenGenerator implements TokenProvider {
  async generateAccessToken(payload: Omit<AccessTokenPayload, 'iat' | 'exp' | 'type'>): Promise<string> {
    return `fake-token-for-${payload.sub}`
  }

  async generateRefreshToken(payload: Omit<RefreshTokenPayload, 'iat' | 'exp' | 'type'>): Promise<string> {
    return `fake-refreshToken-for-${payload.sub}`
  }

  async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
    const sub = token.replace('fake-token-for-', '')
    return {
      sub,
      type: 'access',
      iat: Date.now(),
      exp: Date.now() + 60 * 1000 
    }
  }

  async verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
    const sub = token.replace('fake-refreshToken-for-', '')
    return {
      sub,
      type: 'refresh',
      iat: Date.now(),
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7
    }
  }
}