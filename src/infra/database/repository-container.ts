import { DataSource } from 'typeorm'
import { User as UserORM } from '../database/typeorm/entities/User'
import { UserTypeormRepository } from '../repositories/user-repository.typeorm'
import { TokenTypeormRepository } from '../repositories/token-repository.typeorm'
import { Token } from './typeorm/entities/Token'

export const createRepositories = (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(UserORM)
  const tokenRepository = dataSource.getRepository(Token)

  return {
    userRepository: UserTypeormRepository.build(userRepository),
    tokenRepository: TokenTypeormRepository.build(tokenRepository)
  }
}
