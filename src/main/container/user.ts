import { CreateUserUseCase } from '@/application/usecases/user/create-user.usecase'
import { AuthUserUseCase } from '@/application/usecases/user/auth-user.usecase'

import { CreateUserRoute } from '@/infrastructure/http/api/routes/user/create-user.express.routes'
import { AuthUserRoute } from '@/infrastructure/http/api/routes/user/auth-user.express.routes'

import { UserGateway } from '@/application/gateways/user.gateway'
import { TokenGateway } from '@/application/gateways/token.gateway'

import { TokenProvider } from '@/application/ports/out/token'
import { DateProvider } from '@/application/ports/out/date'
import { Hashing } from '@/application/ports/out/hasher'

import { CreateUserHttpPresenters } from '@/presentation/user-http.presenter'

interface UserComposer {
  repositories: { 
    userRepository: UserGateway
    tokenRepository: TokenGateway
  }
  encrypter: Hashing
  tokenProvider: TokenProvider
  dateProvider: DateProvider
}

export function userRoutes({ repositories, encrypter, tokenProvider, dateProvider }: UserComposer) {
  const userPresenter = new CreateUserHttpPresenters()

  const { userRepository, tokenRepository } = repositories

  const createUserUseCase = CreateUserUseCase.create(userRepository, encrypter)
  const authUserUseCase = AuthUserUseCase.create(
    userRepository,
    encrypter,
    userPresenter,
    tokenProvider,
    tokenRepository,
    dateProvider,
  )

  const createUserRoute = CreateUserRoute.create(createUserUseCase)
  const authUserRoute = AuthUserRoute.create(authUserUseCase, userPresenter)

  return [createUserRoute, authUserRoute]
}
