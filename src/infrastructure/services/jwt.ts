import jwt from 'jsonwebtoken'
import { TokenProvider } from '@/domain/ports/out/token'
import { env } from '@/config/env'

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

  async verifyAccessToken(token: string): Promise<Record<string, unknown>> {
    return jwt.verify(token, this.secretToken) as Record<string, unknown>
  }

  async verifyRefreshToken(token: string): Promise<Record<string, unknown>> {
    return jwt.verify(token, this.secretRefreshToken) as Record<string, unknown>
  }
}