import { DataSource } from 'typeorm'
import { User as UserORM } from '@/infrastructure/database/typeorm/entities/User'
import { Token as TokenOrm } from '@/infrastructure/database/typeorm/entities/Token'
import { Category as CategoryOrm } from '@/infrastructure/database/typeorm/entities/Category'
import { UserTypeormRepository } from '@/infrastructure/repositories/user-repository.typeorm'
import { TokenTypeormRepository } from '@/infrastructure/repositories/token-repository.typeorm'
import { CategoryTypeormRepository } from '../repositories/category-repository.typeorm'

export const createRepositories = (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(UserORM)
  const tokenRepository = dataSource.getRepository(TokenOrm)
  const categoryRepository = dataSource.getRepository(CategoryOrm)

  return {
    userRepository: UserTypeormRepository.build(userRepository),
    tokenRepository: TokenTypeormRepository.build(tokenRepository),
    categoryRepository: CategoryTypeormRepository.build(categoryRepository)
  }
}
