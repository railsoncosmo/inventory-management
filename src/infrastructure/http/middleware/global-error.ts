import { Request, Response, NextFunction } from 'express'
import { Exception } from '@/domain/errors/exception'
import { ZodError } from 'zod'

export const globalError = (
  error: Error & Partial<Exception>,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  
  console.log(error)

  if (error instanceof ZodError) {
    const formattedErrors = error.issues.map(e => ({
      path: e.path.join('.'),
      message: e.message
    }))

    return res.status(400).json({message: 'Erro na validação dos dados enviados.', error: formattedErrors[0]})
  }

  const statusCode = error.statusCode ?? 500
  const message = error.statusCode ? error.message : 'Internal Server Error'
  return res.status(statusCode).json({ message })

}