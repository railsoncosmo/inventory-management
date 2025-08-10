import { CreateUserUseCase } from '@/domain/users/application/usecases/create-user.usecase'
import { AuthUserUseCase } from '@/domain/users/application/usecases/auth-user.usecase'

import { CreateUserRoute } from '@/infrastructure/http/api/routes/user/create-user.express.routes'
import { AuthUserRoute } from '@/infrastructure/http/api/routes/user/auth-user.express.routes'

import { UserGateway } from '@/domain/users/application/gateways/user.gateway'
import { TokenGateway } from '@/domain/users/application/gateways/token.gateway'

import { TokenProvider } from '@/domain/ports/out/token'
import { DateProvider } from '@/domain/ports/out/date'
import { Hashing } from '@/domain/ports/out/hasher'

import { UserHttpPresenters } from '@/presentation/user-http.presenter'
import { GetProfileUserRoute } from '@/infrastructure/http/api/routes/user/get-profile.express.route'
import { GetProfileUsecase } from '@/domain/users/application/usecases/get-profile.usecase'

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
  const userPresenters = new UserHttpPresenters()

  const { userRepository, tokenRepository } = repositories

  const createUserUseCase = CreateUserUseCase.create(userRepository, encrypter)
  const authUserUseCase = AuthUserUseCase.create(
    userRepository,
    encrypter,
    userPresenters,
    tokenProvider,
    tokenRepository,
    dateProvider,
  )

  const getProfileUseCase = GetProfileUsecase.create(
    userRepository,
    userPresenters
  )

  const createUserRoute = CreateUserRoute.create(createUserUseCase)
  const authUserRoute = AuthUserRoute.create(authUserUseCase, userPresenters)
  const getProfileUserRoute = GetProfileUserRoute.create(getProfileUseCase, userPresenters)

  return [createUserRoute, authUserRoute, getProfileUserRoute]
}
