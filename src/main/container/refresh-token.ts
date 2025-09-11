import { TokenProvider } from '@/domain/interfaces/token'
import { TokenGateway } from '@/domain/sub-domains/application/gateways/token.gateway'
import { DateProvider } from '@/domain/interfaces/date'
import { RefreshTokenUseCase } from '@/domain/sub-domains/application/usecases/user/refresh-token.usecase'
import { RefreshTokenRoute } from '@/infrastructure/http/api/routes/user/refresh-token.express.route'
import { Hashing } from '@/domain/interfaces/hasher'

interface RefreshComposer {
  repositories: { 
    tokenRepository: TokenGateway
  }
  tokenProvider: TokenProvider
  dateProvider: DateProvider
  encrypter: Hashing
}

export function tokenRoutes({ repositories, encrypter ,tokenProvider, dateProvider }: RefreshComposer) {

  const { tokenRepository } = repositories

  const refreshTokenUseCase = RefreshTokenUseCase.create(tokenRepository,tokenProvider, encrypter ,dateProvider)
  const refreshTokebRoute = RefreshTokenRoute.create(refreshTokenUseCase)

  return [refreshTokebRoute]
}
