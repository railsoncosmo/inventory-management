import { TokenProvider } from '@/domain/ports/out/token'
import { TokenGateway } from '@/domain/users/application/gateways/token.gateway'
import { DateProvider } from '@/domain/ports/out/date'
import { RefreshTokenUseCase } from '@/domain/users/application/usecases/refresh-token.usecase'
import { RefreshTokenRoute } from '@/infrastructure/http/api/routes/user/refresh-token.express.route'
import { UserHttpPresenters } from '@/presentation/user-http.presenter'

interface RefreshComposer {
  repositories: { 
    tokenRepository: TokenGateway
  }
  tokenProvider: TokenProvider
  dateProvider: DateProvider
}

export function tokenRoutes({ repositories, tokenProvider, dateProvider }: RefreshComposer) {
  const userPresenter = new UserHttpPresenters()

  const { tokenRepository } = repositories

  const refreshTokenUseCase = RefreshTokenUseCase.create(tokenRepository, userPresenter, tokenProvider, dateProvider)
  const refreshTokebRoute = RefreshTokenRoute.create(refreshTokenUseCase, userPresenter)

  return [refreshTokebRoute]
}
