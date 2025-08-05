import { TokenGenerator, TokenVerifier } from '../../application/ports/token'
import { env } from '../../config/env'
import jwt from 'jsonwebtoken'

export class JwtToken implements TokenGenerator, TokenVerifier {
  constructor(
    private readonly secret_token = env.JWT_SECRET,
    private readonly secret_refresh_token = env.REFRESH_TOKEN_SECRET
  ){}

  async generateAccessToken(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, this.secret_token, { expiresIn: '10m' })
  }

  async verifyAccessToken(token: string): Promise<Record<string, unknown>> {
    return jwt.verify(token, this.secret_token) as Record<string, unknown>
  }

  async generateRefreshToken(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, this.secret_refresh_token , { expiresIn: '7d' })
  }

  async verifyRefreshToken(refreshToken: string): Promise<Record<string, unknown>> {
    return jwt.verify(refreshToken, this.secret_token) as Record<string, unknown>
  }
}