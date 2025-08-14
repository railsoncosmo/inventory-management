import { User } from '@/domain/users/enterprise/entities/user.entity'

export interface GetProfileInputDto {
  user_id: string
}

export interface GetProfileOutputDto {
  user: User
}