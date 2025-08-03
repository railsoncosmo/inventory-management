import { TokenGenerator, TokenVerifier } from '../../application/ports/token'
import jwt from 'jsonwebtoken'

export class JwtToken implements TokenGenerator, TokenVerifier {
  constructor(
    private readonly secret: string,
  ){}

  async generate(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn: '8d' })
  }

  async verify(token: string): Promise<Record<string, unknown>> {
    return jwt.verify(token, this.secret) as Record<string, unknown>
  }
}