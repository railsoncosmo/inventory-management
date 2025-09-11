import { User } from '@/domain/sub-domains/enterprise/entities/user.entity'

export type CreateUserInputDto = {
  name: string
  email: string
  password: string
  image_url?: string
  phone: string
  role: 'admin' | 'user'
}

export type CreateUserOutputDto = {
  user: User
}