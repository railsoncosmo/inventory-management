import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError'
import { ZodError } from 'zod'

export const globalError = (
  error: Error & Partial<AppError>,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  if (error instanceof ZodError) {
    console.log(error)
    return res.status(400).send({message: 'Erro de validação.'})
  }

  const statusCode = error.statusCode ?? 500
  const message = error.statusCode ? error.message : 'Internal Server Error'
  return res.status(statusCode).json({ message })

}