export interface TokenProvider {
  generateAccessToken(payload: Record<string, unknown>): Promise<string>
  generateRefreshToken(payload: Record<string, unknown>): Promise<string>
  verifyAccessToken(token: string): Promise<Record<string, unknown>>
  verifyAccessToken(token: string): Promise<Record<string, unknown>>
}