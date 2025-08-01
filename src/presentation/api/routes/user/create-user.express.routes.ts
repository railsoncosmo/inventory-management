import { ZodError } from 'zod'
import { Request, Response } from 'express'
import { CreateUserUseCase } from '../../../../application/usecases/user/create-user.usecase'
import { httpMethod, HttpMethod, Routes } from '../../routes/routes'
import { CreateUserHttpPresenters } from '../../../http/presenters/create-user-http.presenter'
import { CreateUserInputDto } from '../../../../application/dto/create-user.dto'
import { createUserBodySchema } from '../../../validators/user/create-user-body-schema'

export type CreateUserResponseDto = {
  id: string
}

export class CreateUserRoute implements Routes, CreateUserHttpPresenters {
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

        const output: CreateUserResponseDto = await this.createUserUseCase.execute(input)
        const responseBody = this.present(output)

        res.status(201).json(responseBody).send()
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(409).send({ message: error.message })
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

  present(user: CreateUserResponseDto): CreateUserResponseDto {
    const response = {
      id: user.id
    }

    return response
  }
}