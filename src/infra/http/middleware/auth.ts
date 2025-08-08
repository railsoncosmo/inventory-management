import { Request, Response,NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { env } from '../../../config/env'

interface Payload {
    sub: string
}

export function authentication(req: Request, res: Response, next: NextFunction){

  if(!req.headers.authorization){
    return res.status(401).end({ message: 'Token de acesso não fornecido.' })
  }

  const authtoken = req.headers.authorization

  const [, token] = authtoken.split(' ')

  try {
    const { sub } = verify(token, env.JWT_SECRET) as Payload

    req.user_id = sub

    return next()
  } catch {
    return res.status(401).json({ message: 'Token de acesso inválido ou expirado.' })
  }
}