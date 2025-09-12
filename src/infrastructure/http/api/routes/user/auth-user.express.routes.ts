import { Request, Response } from 'express'
import { AuthUserRequest, AuthUserUseCase } from '@/domain/sub-domains/application/usecases/user/auth-user.usecase'
import { httpMethod, HttpMethod, Routes } from '@/infrastructure/http/api/routes/routes'
import { authUserBodySchema } from '@/shared/validators/auth-user-body-schema'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'

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

  getPath(): string {
    return this.path
  }
  getMethod(): HttpMethod {
    return this.method
  }

  getHandler() {
    return async (req: Request, res: Response) => {

      try {
        const { email, password } = authUserBodySchema.parse(req.body)
        const input: AuthUserRequest = {
          email,
          password,
        }

        const { token, refresh_token } = await this.authUserUseCase.execute(input)
        
        res
          .cookie('refresh_token', refresh_token, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true })
          .status(200)
          .json({token})

      } catch (error) {
        if (error instanceof InvalidCredentialsError) {
          res.status(401).send({ message: error.message })
        }
        throw error
      }
    }
  }
}