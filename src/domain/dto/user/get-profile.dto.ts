import { User } from '@/domain/sub-domains/enterprise/entities/user.entity'

export interface GetProfileInputDto {
  user_id: string
}

// export interface GetProfileOutputDto {
//   user: User
// }

export type GetProfileOutputDto = Omit<User, 'password' | 'asPublic'>