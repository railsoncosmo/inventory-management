export type AuthUserInputDto = {
  email: string
  password: string
}

export type AuthUserOutputDto = {
  token: string
}