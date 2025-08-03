import 'dotenv/config'
import 'express-async-errors'
import { env } from './config/env'

import { CreateUserUseCase } from './application/usecases/user/create-user.usecase'
import { createRepositories } from './infra/database/repository-container'
import { AppDataSource } from './package/typeorm/data-source'
import { CreateUserRoute } from './presentation/api/routes/user/create-user.express.routes'
import { BcryptHash } from './infra/adapters/hash-adapter'
import { ApiExpress } from './presentation/api/express/api.express'
import { AuthUserUseCase } from './application/usecases/user/auth-user.usecase'
import { CreateUserHttpPresenters } from './presentation/http/presenters/create-user-http.presenter'
import { JwtToken } from './infra/adapters/jwt-adapter'
import { AuthUserRoute } from './presentation/api/routes/user/auth-user.express.routes'

async function server(){
  try {
    const dataSource = await AppDataSource.initialize()
    console.log('Connection initialized with database...')

    const repositories = createRepositories(dataSource)

    const encrypter = BcryptHash.create()
    const createUserUseCase = CreateUserUseCase.create(repositories.userRepository, encrypter)

    const userPresenters = new CreateUserHttpPresenters()
    const tokenGenerator = new JwtToken(env.JWT_SECRET)
    const authUserUseCase = AuthUserUseCase.create(repositories.userRepository, encrypter, userPresenters, tokenGenerator)

    const createUserRoute = CreateUserRoute.create(createUserUseCase)
    const authUserRoute = AuthUserRoute.create(authUserUseCase)

    const api = ApiExpress.create([createUserRoute, authUserRoute])
    api.start(env.PORT)

  } catch (error) {
    console.error('Failed to initialize server:', error)
  }
  
}

server()
