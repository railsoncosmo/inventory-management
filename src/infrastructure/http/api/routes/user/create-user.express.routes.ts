import { Request, Response } from 'express'
import { CreateUserUseCase } from '@/domain/sub-domains/application/usecases/user/create-user.usecase'
import { httpMethod, HttpMethod, Routes } from '@/infrastructure/http/api/routes/routes'
import { CreateUserInputDto } from '@/domain/dto/user/create-user.dto'
import { createUserBodySchema } from '@/shared/validators/create-user-body-schema'
import { UserAlreadyExistsError } from '@/domain/errors/user-already-exists-error'
import { UserRole } from '@/enums/roles'

export class CreateUserRoute implements Routes {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createUserUseCase: CreateUserUseCase,
  ){}

  public static create(createUserUseCase: CreateUserUseCase){
    return new CreateUserRoute(
      '/users',
      httpMethod.POST,
      createUserUseCase,
    )
  }

  getPath(): string {
    return this.path
  }
  getMethod(): HttpMethod {
    return this.method
  }

  getHandler() {
    return async (req: Request, res: Response) => {

      try {
        const { name, email, password, phone, image_url, role } = createUserBodySchema.parse(req.body)

        const input: CreateUserInputDto = {
          name,
          email,
          password,
          phone,
          image_url,
          role
        }

        await this.createUserUseCase.execute(input)

        res.status(201).send()
      } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
          res.status(409).json({ message: error.message })
        }
        throw error
      }
    }
  }
}