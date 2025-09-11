import { NextFunction, Request, Response } from 'express'
import { CreateCategoryUseCase } from '@/domain/sub-domains/application/usecases/category/create-category.usecase'
import { httpMethod, HttpMethod, Routes } from '@/infrastructure/http/api/routes/routes'
import { CategoryAlreadyExistsError } from '@/domain/errors/category-already-exists-error'
import { createCategoryBodySchema } from '@/shared/validators/create-category-body-schema'
import { CreateCategoryInputDto } from '@/domain/dto/category/create-category.dto'
import { AuthenticatedUser } from '@/infrastructure/http/middleware/authenticate-user'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'

export class CreateCategoryRoute implements Routes {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly authenticatedUser: AuthenticatedUser,
  ){}

  public static create(createCategoryUseCase: CreateCategoryUseCase,
    authenticatedUser: AuthenticatedUser
  ){
    return new CreateCategoryRoute(
      '/categories',
      httpMethod.POST,
      createCategoryUseCase,
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
        const user = await this.authenticatedUser.getCurrentUser(req)

        if (!user || !user.id) {
          throw new UnauthorizedError('Usuário não encontrado.')
        }

        const { name } = createCategoryBodySchema.parse(req.body)
        const input: CreateCategoryInputDto = {
          name,
        }

        const category = await this.createCategoryUseCase.execute(input)

        res.status(201).json(category)
      } catch (error) {
        if (error instanceof CategoryAlreadyExistsError) {
          res.status(409).json({ message: error.message })
        }
        throw error
      }
    }
  }
}

