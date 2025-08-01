import 'dotenv/config'
import 'express-async-errors'
import { env } from './config/env'

import { CreateUserUseCase } from './application/usecases/user/create-user.usecase'
import { createRepositories } from './infra/database/repository-container'
import { AppDataSource } from './package/typeorm/data-source'
import { CreateUserRoute } from './presentation/api/routes/user/create-user.express.routes'
import { BcryptHash } from './infra/adapters/hash-adapter'
import { CreateUserHttpPresenters } from './presentation/http/presenters/create-user-http.presenter'
import { ApiExpress } from './presentation/api/express/api.express'

async function server(){
  try {
    const dataSource = await AppDataSource.initialize()
    console.log('Connection initialized with database...')

    const repositories = createRepositories(dataSource)

    const hashing = BcryptHash.create()
    const presenter = new CreateUserHttpPresenters()
    const createUserUseCase = CreateUserUseCase.create(repositories.userRepository, presenter, hashing)

    const createUserRoute = CreateUserRoute.create(createUserUseCase)

    const api = ApiExpress.create([createUserRoute])
    api.start(env.PORT)

  } catch (error) {
    console.error('Failed to initialize server:', error)
  }
  
}

server()
