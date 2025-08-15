import { User } from '@/domain/users/enterprise/entities/user.entity'

export type CreateUserInputDto = {
  name: string
  email: string
  password: string
  phone: string
  role: 'admin' | 'user'
}

export type CreateUserOutputDto = {
  user: User
}