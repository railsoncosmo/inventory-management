import { NextFunction, Request, Response } from 'express'
import { httpMethod, HttpMethod, Routes } from '../routes'
import { GetProfileUsecase } from '@/domain/sub-domains/application/usecases/user/get-profile.usecase'
import { AuthenticatedUser } from '@/infrastructure/http/middleware/authenticate-user'

export class GetProfileUserRoute implements Routes{
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getProfileUseCase: GetProfileUsecase,
    private readonly authenticatedUser: AuthenticatedUser,
  ){}
  
  public static create(getProfileUseCase: GetProfileUsecase,
    authenticatedUser: AuthenticatedUser
  ){
    return new GetProfileUserRoute(
      '/me',
      httpMethod.GET,
      getProfileUseCase,
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

      const user = await this.authenticatedUser.getCurrentUser(req)

      res.status(200).json(user)
    }
  }
}