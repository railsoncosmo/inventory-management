export interface TokenGenerator {
  generateAccessToken(payload: Record<string, unknown>): Promise<string>
  generateRefreshToken(payload: Record<string, unknown>): Promise<string>
}

export interface TokenVerifier {
  verifyAccessToken(token: string): Promise<Record<string, unknown>>
  verifyRefreshToken(refreshToken: string): Promise<Record<string, unknown>>
}