import { TokenProvider } from '@/application/ports/out/token'
import { TokenGateway } from '@/application/gateways/token.gateway'
import { DateProvider } from '@/application/ports/out/date'
import { RefreshTokenUseCase } from '@/application/usecases/token/refresh-token.usecase'
import { RefreshTokenRoute } from '@/infrastructure/http/api/routes/user/refresh-token.express.route'
import { CreateUserHttpPresenters } from '@/presentation/user-http.presenter'

interface RefreshComposer {
  repositories: { 
    tokenRepository: TokenGateway
  }
  tokenProvider: TokenProvider
  dateProvider: DateProvider
}

export function tokenRoutes({ repositories, tokenProvider, dateProvider }: RefreshComposer) {
  const userPresenter = new CreateUserHttpPresenters()

  const { tokenRepository } = repositories

  const refreshTokenUseCase = RefreshTokenUseCase.create(tokenRepository, userPresenter, tokenProvider, dateProvider)
  const refreshTokebRoute = RefreshTokenRoute.create(refreshTokenUseCase, userPresenter)

  return [refreshTokebRoute]
}
