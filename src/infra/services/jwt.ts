import { TokenGenerator, TokenVerifier } from '../../application/ports/token'
import jwt from 'jsonwebtoken'

export class JwtToken implements TokenGenerator, TokenVerifier {
  constructor(
    private readonly secret: string,
  ){}

  async generateAccessToken(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn: '10m' })
  }

  async verifyAccessToken(token: string): Promise<Record<string, unknown>> {
    return jwt.verify(token, this.secret) as Record<string, unknown>
  }

  async generateRefreshToken(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn: '7d' })
  }

  async verifyRefreshToken(refreshToken: string): Promise<Record<string, unknown>> {
    return jwt.verify(refreshToken, this.secret) as Record<string, unknown>
  }
}