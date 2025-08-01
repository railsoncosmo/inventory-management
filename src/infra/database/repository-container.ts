import { DataSource } from 'typeorm'
import { User as UserORM } from '../database/typeorm/entities/User'
import { UserTypeormRepository } from '../repositories/user-repository.typeorm'

export const createRepositories = (dataSource: DataSource) => {
  const ormRepo = dataSource.getRepository(UserORM)

  return {
    userRepository: UserTypeormRepository.create(ormRepo),
  }
}
