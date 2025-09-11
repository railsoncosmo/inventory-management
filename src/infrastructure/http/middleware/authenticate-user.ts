import { Request, Response,NextFunction } from 'express'
import { env } from '@/config/env'
import { verify, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { ForbiddenError } from '@/domain/errors/forbidden-error'
import { GetProfileUsecase } from '@/domain/sub-domains/application/usecases/user/get-profile.usecase'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { GetProfileOutputDto } from '@/domain/dto/user/get-profile.dto'

interface Payload {
  sub: string
  type: 'access' | 'refresh'
}

export class AuthenticatedUser {
  private constructor(private readonly getProfileUseCase: GetProfileUsecase) {}

  public static create(getProfileUseCase: GetProfileUsecase) {
    return new AuthenticatedUser(getProfileUseCase)
  }

  middleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.headers.authorization) {
          return res.status(401).json({ message: 'Credenciais inválidas.' })
        }

        const authtoken = req.headers.authorization
        const [, token] = authtoken.split(' ')

        const payload = verify(token, env.JWT_SECRET) as Payload

        if (payload.type !== 'access') {
          return res.status(403).json({ message: 'Tipo de token inválido para acessar esta rota.' })
        }

        req.user_id = payload.sub
        return next()
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          return res.status(401).json({ message: 'Token expirado.' })
        }
        if (error instanceof JsonWebTokenError) {
          return res.status(401).json({ message: 'Token inválido.' })
        }

        throw new ForbiddenError('Erro de autenticação.')
      }
    }
  }

  async getCurrentUser(req: Request): Promise<GetProfileOutputDto> {
    if (!req.user_id) {
      throw new UnauthorizedError('Usuário não autenticado')
    }

    return await this.getProfileUseCase.execute({ user_id: req.user_id })
  }
}