
export interface CreateTokenDto {
  user_id: string
  expires_date: Date
  refresh_token: string
}

export interface RefreshTokenInputDto {
  token: string
}

export interface RefreshTokenOutputDto {
  refresh_token: string
}