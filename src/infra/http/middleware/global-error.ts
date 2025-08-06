import { Request, Response, NextFunction } from 'express'
import { AppError } from '../../../application/errors/app-error'
import { ZodError } from 'zod'

export const globalError = (
  error: Error & Partial<AppError>,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  // if (res.headersSent) {
  //   return _next(error)
  // }
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