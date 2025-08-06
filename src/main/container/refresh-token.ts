import { CreateUserHttpPresenters } from '../../presentation/user-http.presenter'
import { TokenGenerator, TokenVerifier } from '../../application/ports/token'
import { TokenGateway } from '../../core/domain/entities/token/token.gateway'
import { DateProvider } from '../../application/ports/date'
import { RefreshTokenUseCase } from '../../application/usecases/token/refresh-token.usecase'
import { RefreshTokenRoute } from '../../infra/http/api/routes/user/refresh-token.express.route'

interface RefreshComposer {
  repositories: { 
    tokenRepository: TokenGateway
  }
  tokenVerifier: TokenVerifier
  tokenGenerator: TokenGenerator
  dateProvider: DateProvider
}

export function tokenRoutes({ repositories, tokenGenerator, dateProvider, tokenVerifier }: RefreshComposer) {
  const userPresenter = new CreateUserHttpPresenters()

  const { tokenRepository } = repositories

  const refreshTokenUseCase = RefreshTokenUseCase.create(tokenRepository, userPresenter, tokenVerifier, tokenGenerator, dateProvider)
  const refreshTokebRoute = RefreshTokenRoute.create(refreshTokenUseCase, userPresenter)

  return [refreshTokebRoute]
}
