import { NextFunction, Request, Response } from 'express'
import { httpMethod, HttpMethod, Routes } from '@/infrastructure/http/api/routes/routes'
import { createCategoryBodySchema } from '@/shared/validators/create-category-body-schema'
import { AuthenticatedUser } from '@/infrastructure/http/middleware/authenticate-user'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { getUserPermission } from '@/utils/get-user-permission'
import { Role } from '@/infrastructure/rbac/roles'
import { UpdateCategoryRequest, UpdateCategoryUseCase } from '@/domain/sub-domains/application/usecases/category/update-category.usecase'
import { NotFoundError } from '@/domain/errors/not-found-error'

export class UpdateCategoryRoute implements Routes {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly authenticatedUser: AuthenticatedUser,
  ){}

  public static create(updateCategoryUseCase: UpdateCategoryUseCase,
    authenticatedUser: AuthenticatedUser
  ){
    return new UpdateCategoryRoute(
      '/categories/:id',
      httpMethod.PUT,
      updateCategoryUseCase,
      authenticatedUser
    )
  }

  getPath(): string {
    return this.path
  }
  getMethod(): HttpMethod {
    return this.method
  }

  getMiddlewares(): Array<(req: Request, res: Response, next: NextFunction) => void> {
    return [this.authenticatedUser.middleware()]
  }

  getHandler() {
    return async (req: Request, res: Response) => {

      try {
        const { id } = req.params
        const { name } = createCategoryBodySchema.parse(req.body)
        const user = await this.authenticatedUser.getCurrentUser(req)

        if (!user || !user.id) {
          throw new UnauthorizedError('Usuário não autenticado.')
        }

        const ability = getUserPermission(user.id, user.role as Role)
        if(ability.cannot('create', 'Category')){
          throw new UnauthorizedError('Você não tem permissão para acessar esta funcionalidade.')
        }

        const input: UpdateCategoryRequest = {
          id: id,
          name: name,
        }

        const category = await this.updateCategoryUseCase.execute(input)

        res.status(200).json(category.asPublic())
      } catch (error) {
        if (error instanceof NotFoundError) {
          res.status(409).json({ message: error.message })
        }
        throw error
      }
    }
  }
}

