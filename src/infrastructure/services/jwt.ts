import jwt from 'jsonwebtoken'
import { env } from '@/config/env'
import { TokenProvider } from '@/domain/ports/out/token'
import { AccessTokenPayload, RefreshTokenPayload } from '@/core/types/base-token'

export class JwtToken implements TokenProvider {
  constructor(
    private readonly secretToken = env.JWT_SECRET,
    private readonly secretRefreshToken = env.REFRESH_TOKEN_SECRET
  ){}

  async generateAccessToken(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign({ ...payload, type: 'access' }, this.secretToken, { expiresIn: '5m' })
  }

  async generateRefreshToken(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign({ ...payload, type: 'refresh' }, this.secretRefreshToken , { expiresIn: '7d' })
  }

  async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
    return jwt.verify(token, this.secretToken) as AccessTokenPayload
  }

  async verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
    return jwt.verify(token, this.secretRefreshToken) as RefreshTokenPayload
  }
}