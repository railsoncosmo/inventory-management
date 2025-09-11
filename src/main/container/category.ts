import { CategoryGateway } from '@/domain/sub-domains/application/gateways/category.gateway'
import { UserGateway } from '@/domain/sub-domains/application/gateways/user.gateway'
import { CreateCategoryUseCase } from '@/domain/sub-domains/application/usecases/category/create-category.usecase'
import { GetProfileUsecase } from '@/domain/sub-domains/application/usecases/user/get-profile.usecase'
import { CreateCategoryRoute } from '@/infrastructure/http/api/routes/category/create-category.express.routes'
import { AuthenticatedUser } from '@/infrastructure/http/middleware/authenticate-user'

interface CategoryComposer {
  repositories: {
    userRepository: UserGateway
    categoryRepository: CategoryGateway
  }
}

export function categoryRoutes({ repositories }: CategoryComposer) {

  const { categoryRepository, userRepository } = repositories

  const getProfileUseCase = GetProfileUsecase.create(userRepository)
  const authenticatedUser = AuthenticatedUser.create(getProfileUseCase)

  const categoryUseCase = CreateCategoryUseCase.create(categoryRepository)
  const categoryRoute = CreateCategoryRoute.create(categoryUseCase, authenticatedUser)

  return [categoryRoute]
}
