export interface TokenGenerator {
  generateAccessToken(payload: Record<string, unknown>): Promise<string>
  generateRefreshToken(payload: Record<string, unknown>): Promise<string>
}

export interface TokenVerifier {
  verifyToken(token: string): Promise<Record<string, unknown>>
}