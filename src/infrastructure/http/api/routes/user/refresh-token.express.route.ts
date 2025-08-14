import { Request, Response } from 'express'
import { httpMethod, HttpMethod, Routes } from '@/infrastructure/http/api/routes/routes'
import { RefreshTokenUseCase } from '@/domain/users/application/usecases/refresh-token.usecase'
import { UserHttpPresenters } from '@/presentation/user-http.presenter'
import { NotFoundError } from '@/domain/errors/not-found-error'

export type CreateUserResponseDto = {
  id: string
}

export class RefreshTokenRoute implements Routes {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly createUserHttpPresenters: UserHttpPresenters,
  ){}

  public static create(refreshTokenUseCase: RefreshTokenUseCase, createUserHttpPresenters: UserHttpPresenters){
    return new RefreshTokenRoute(
      '/refresh/token',
      httpMethod.POST,
      refreshTokenUseCase,
      createUserHttpPresenters
    )
  }

  getHandler() {
    return async (req: Request, res: Response) => {
      const token = req.body.token || req.headers['x-access-token'] || req.query.token || req.cookies['refresh_token']
      
      if(!token){
        throw new NotFoundError('Token não encontrado ou inválido.')
      }
      
      const refresh_token = await this.refreshTokenUseCase.execute({token})
      await this.createUserHttpPresenters.presentRefreshToken(refresh_token)
      res
        .cookie('refresh_token', refresh_token, {
          path: '/',
          secure: true,
          sameSite: true,
          httpOnly: true })
        .status(200)
        .json(refresh_token)
    }
  }
  getPath(): string {
    return this.path
  }

  getMethod(): HttpMethod {
    return this.method
  }
}