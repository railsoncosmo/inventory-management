import { AccessTokenPayload, RefreshTokenPayload } from '@/core/types/base-token'

export interface TokenProvider {
  generateAccessToken(payload: Omit<AccessTokenPayload, 'iat' | 'exp' | 'type'>): Promise<string>
  generateRefreshToken(payload: Omit<RefreshTokenPayload, 'iat' | 'exp' | 'type'>): Promise<string>
  verifyAccessToken(token: string): Promise<AccessTokenPayload>
  verifyRefreshToken(token: string): Promise<RefreshTokenPayload>
}