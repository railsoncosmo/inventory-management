import jwt from 'jsonwebtoken'
import { TokenProvider } from '@/application/ports/out/token'
import { env } from '@/config/env'

export class JwtToken implements TokenProvider {
  constructor(
    private readonly secret_token = env.JWT_SECRET,
    private readonly secret_refresh_token = env.REFRESH_TOKEN_SECRET
  ){}

  async generateAccessToken(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, this.secret_token, { expiresIn: '5m' })
  }

  async generateRefreshToken(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, this.secret_refresh_token , { expiresIn: '7d' })
  }

  async verifyToken(token: string): Promise<Record<string, unknown>> {
    return jwt.verify(token, this.secret_token) as Record<string, unknown>
  }
}