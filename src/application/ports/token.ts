export interface TokenGenerator {
  generate(payload: Record<string, unknown>): Promise<string>
}

export interface TokenVerifier {
  verify(token: string): Promise<Record<string, unknown>>
}