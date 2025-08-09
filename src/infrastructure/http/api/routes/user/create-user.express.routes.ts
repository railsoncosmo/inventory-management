import { Request, Response } from 'express'
import { CreateUserUseCase } from '@/application/usecases/user/create-user.usecase'
import { httpMethod, HttpMethod, Routes } from '@/infrastructure/http/api/routes/routes'
import { CreateUserInputDto } from '@/application/dto/user/create-user.dto'
import { createUserBodySchema } from '@/shared/validators/create-user-body-schema'
import { UserAlreadyExistsError } from '@/application/errors/user-already-exists-error'

export type CreateUserResponseDto = {
  id: string
}

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

  getHandler() {
    return async (req: Request, res: Response) => {

      try {
        const { name, email, password, phone, role } = createUserBodySchema.parse(req.body)

        const input: CreateUserInputDto = {
          name,
          email,
          password,
          phone,
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

  getPath(): string {
    return this.path
  }
  getMethod(): HttpMethod {
    return this.method
  }
}