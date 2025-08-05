import { CreateUserUseCase } from '../../application/usecases/user/create-user.usecase'
import { AuthUserUseCase } from '../../application/usecases/user/auth-user.usecase'

import { CreateUserRoute } from '../../infra/http/api/routes/user/create-user.express.routes'
import { AuthUserRoute } from '../../infra/http/api/routes/user/auth-user.express.routes'

import { CreateUserHttpPresenters } from '../../presentation/user-http.presenter'
import { UserGateway } from '../../core/domain/entities/user/user.gateway'
import { TokenGenerator } from '../../application/ports/token'
import { Hashing } from '../../application/ports/hasher'

interface ComposerUser {
  repositories: { 
    userRepository: UserGateway 
  }
  encrypter: Hashing
  tokenGenerator: TokenGenerator
}

export function userRoutes({ repositories, encrypter, tokenGenerator }: ComposerUser) {
  const userPresenter = new CreateUserHttpPresenters()

  const { userRepository } = repositories

  const createUserUseCase = CreateUserUseCase.create(userRepository , encrypter)
  const authUserUseCase = AuthUserUseCase.create(
    userRepository,
    encrypter,
    userPresenter,
    tokenGenerator
  )

  const createUserRoute = CreateUserRoute.create(createUserUseCase)
  const authUserRoute = AuthUserRoute.create(authUserUseCase)

  return [createUserRoute, authUserRoute]
}
