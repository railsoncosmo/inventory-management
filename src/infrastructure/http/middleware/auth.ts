import { Request, Response,NextFunction } from 'express'
import { env } from '@/config/env'
import { verify, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { ForbiddenError } from '@/domain/errors/forbidden-error'

interface Payload {
  sub: string
  type: 'access' | 'refresh'
}

export function authentication(req: Request, res: Response, next: NextFunction){

  if(!req.headers.authorization){
    return res.status(401).json({ message: 'Credenciais inválidas.' })
  }

  const authtoken = req.headers.authorization

  const [, token] = authtoken.split(' ')

  try {
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