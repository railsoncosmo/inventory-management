export interface BaseJwtPayload {
  sub: string
  iat?: number
  exp?: number
}

export interface AccessTokenPayload extends BaseJwtPayload {
  type: 'access'
}

export interface RefreshTokenPayload extends BaseJwtPayload {
  type: 'refresh'
}