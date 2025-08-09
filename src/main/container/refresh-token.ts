import { CreateUserHttpPresenters } from '../../presentation/user-http.presenter'
import { TokenProvider } from '../../application/ports/token'
import { TokenGateway } from '../../core/domain/entities/token/token.gateway'
import { DateProvider } from '../../application/ports/date'
import { RefreshTokenUseCase } from '../../application/usecases/token/refresh-token.usecase'
import { RefreshTokenRoute } from '../../infra/http/api/routes/user/refresh-token.express.route'

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
