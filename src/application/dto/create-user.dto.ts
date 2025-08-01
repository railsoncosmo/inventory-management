export type CreateUserInputDto = {
  name: string
  email: string
  password: string
  phone: string
  role: 'ADMIN' | 'USER'
}

export type CreateUserOutputDto = {
  id: string
}