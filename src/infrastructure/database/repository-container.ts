import { DataSource } from 'typeorm'
import { User as UserORM } from '@/infrastructure/database/typeorm/entities/User'
import { Token as TokenOrm } from '@/infrastructure/database/typeorm/entities/Token'
import { UserTypeormRepository } from '@/infrastructure/repositories/user-repository.typeorm'
import { TokenTypeormRepository } from '@/infrastructure/repositories/token-repository.typeorm'

export const createRepositories = (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(UserORM)
  const tokenRepository = dataSource.getRepository(TokenOrm)

  return {
    userRepository: UserTypeormRepository.build(userRepository),
    tokenRepository: TokenTypeormRepository.build(tokenRepository)
  }
}
