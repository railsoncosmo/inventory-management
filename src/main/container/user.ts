import { CreateUserUseCase } from '@/domain/sub-domains/application/usecases/user/create-user.usecase'
import { AuthUserUseCase } from '@/domain/sub-domains/application/usecases/user/auth-user.usecase'

import { CreateUserRoute } from '@/infrastructure/http/api/routes/user/create-user.express.routes'
import { AuthUserRoute } from '@/infrastructure/http/api/routes/user/auth-user.express.routes'

import { UserGateway } from '@/domain/sub-domains/application/gateways/user.gateway'
import { TokenGateway } from '@/domain/sub-domains/application/gateways/token.gateway'

import { TokenProvider } from '@/domain/interfaces/token'
import { DateProvider } from '@/domain/interfaces/date'
import { Hashing } from '@/domain/interfaces/hasher'

import { GetProfileUserRoute } from '@/infrastructure/http/api/routes/user/get-profile.express.route'
import { GetProfileUsecase } from '@/domain/sub-domains/application/usecases/user/get-profile.usecase'
import { AuthenticatedUser } from '@/infrastructure/http/middleware/authenticate-user'

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

  const { userRepository, tokenRepository } = repositories

  const createUserUseCase = CreateUserUseCase.create(userRepository, encrypter)
  const authUserUseCase = AuthUserUseCase.create(
    userRepository,
    encrypter,
    tokenProvider,
    tokenRepository,
    dateProvider,
  )

  const getProfileUseCase = GetProfileUsecase.create(userRepository)
  const authenticatedUser = AuthenticatedUser.create(getProfileUseCase)

  const createUserRoute = CreateUserRoute.create(createUserUseCase)
  const authUserRoute = AuthUserRoute.create(authUserUseCase)
  const getProfileUserRoute = GetProfileUserRoute.create(getProfileUseCase, authenticatedUser)

  return [createUserRoute, authUserRoute, getProfileUserRoute]
}
