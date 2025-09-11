import { Request, Response } from 'express'
import { httpMethod, HttpMethod, Routes } from '@/infrastructure/http/api/routes/routes'
import { RefreshTokenUseCase } from '@/domain/sub-domains/application/usecases/user/refresh-token.usecase'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { RefreshTokenInputDto } from '@/domain/dto/user/token-user.dto'

export type CreateUserResponseDto = {
  id: string
}

export class RefreshTokenRoute implements Routes {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ){}

  public static create(refreshTokenUseCase: RefreshTokenUseCase){
    return new RefreshTokenRoute(
      '/refresh/token',
      httpMethod.POST,
      refreshTokenUseCase,
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
      const refreshToken: RefreshTokenInputDto = {
        refresh_token: req.cookies['refresh_token']
      }
      if(!refreshToken){
        throw new NotFoundError('Token não encontrado ou inválido.')
      }
      
      const { token, refresh_token } = await this.refreshTokenUseCase.execute(refreshToken)

      res
        .cookie('refresh_token', refresh_token, {
          path: '/',
          secure: true,
          sameSite: true,
          httpOnly: true })
        .status(200)
        .json({token})
    }
  }
}