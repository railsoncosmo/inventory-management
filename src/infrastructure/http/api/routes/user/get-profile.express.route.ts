import { NextFunction, Request, Response } from 'express'
import { httpMethod, HttpMethod, Routes } from '../routes'
import { GetProfileUsecase } from '@/domain/users/application/usecases/get-profile.usecase'
import { UserHttpPresenters } from '@/presentation/user-http.presenter'
import { authentication } from '@/infrastructure/http/middleware/auth'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'

export class GetProfileUserRoute implements Routes{
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getProfileUseCase: GetProfileUsecase,
    private readonly userHttpPresenters: UserHttpPresenters,
  ){}
  
  public static create(getProfileUseCase: GetProfileUsecase, userHttpPresenters: UserHttpPresenters){
    return new GetProfileUserRoute(
      '/me',
      httpMethod.GET,
      getProfileUseCase,
      userHttpPresenters
    )
  }
  
  getHandler() {
    return async (req: Request, res: Response) => {
      const currentUser = req.user_id

      if(!currentUser){
        throw new UnauthorizedError('Usuário não autenticado')
      }

      const user = await this.getProfileUseCase.execute({ user_id: currentUser })
      await this.userHttpPresenters.presentCurrentProfile(user)

      res.status(200).json(user)
    }
  }

  getPath(): string {
    return this.path
  }
  getMethod(): HttpMethod {
    return this.method
  }

  getMiddlewares(): Array<(req: Request, res: Response, next: NextFunction) => void> {
    return [authentication]
  }
}