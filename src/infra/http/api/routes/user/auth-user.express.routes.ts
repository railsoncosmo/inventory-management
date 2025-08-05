import { Request, Response } from 'express'
import { AuthUserUseCase } from '../../../../../application/usecases/user/auth-user.usecase'
import { httpMethod, HttpMethod, Routes } from '../../routes/routes'
import { authUserBodySchema } from '../../../../../shared/validators/user/auth-user-body-schema'
import { AuthUserInputDto } from '../../../../../application/dto/user/auth-user.dto'
import { InvalidCredentialsError } from '../../../../../application/errors/invalid-credentials-error'

export type CreateUserResponseDto = {
  id: string
}

export class AuthUserRoute implements Routes {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly authUserUseCase: AuthUserUseCase,
    
  ){}

  public static create(authUserUseCase: AuthUserUseCase){
    return new AuthUserRoute(
      '/session',
      httpMethod.POST,
      authUserUseCase,
    )
  }

  getHandler() {
    return async (req: Request, res: Response) => {

      try {
        const { email, password } = authUserBodySchema.parse(req.body)

        const input: AuthUserInputDto = {
          email,
          password,
        }

        const { token, refresh_token } = await this.authUserUseCase.execute(input)

        res
          .cookie('refreshToken', refresh_token, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true })
          .status(200)
          .send({ token })
          
      } catch (error) {
        if (error instanceof InvalidCredentialsError) {
          res.status(401).send({ message: error.message })
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