export interface TokenProvider {
  generateAccessToken(payload: Record<string, unknown>): Promise<string>
  generateRefreshToken(payload: Record<string, unknown>): Promise<string>
  verifyToken(token: string): Promise<Record<string, unknown>>
}