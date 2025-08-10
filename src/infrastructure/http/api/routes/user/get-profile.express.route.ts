import { Request, Response } from 'express'
import { httpMethod, HttpMethod, Routes } from '../routes'
import { GetProfileUsecase } from '@/domain/users/application/usecases/get-profile.usecase'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { UserHttpPresenters } from '@/presentation/user-http.presenter'

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
      try {
        const currentUser = req.user_id

        const user = await this.getProfileUseCase.execute({ user_id: currentUser })

        await this.userHttpPresenters.presentCurrentProfile(user)

        res.status(200).json(user)
      } catch (error) {
        if(error instanceof NotFoundError){
          res.status(404).json({ message: error.message })
        }
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