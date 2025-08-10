export type AuthUserInputDto = {
  email: string
  password: string
}

export type AuthUserOutputDto = {
  token: string
  refresh_token: string
}