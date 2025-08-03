import { Request, Response, NextFunction } from 'express'
import { AppError } from '../../../application/errors/app-error'
import { ZodError } from 'zod'

export const globalError = (
  error: Error & Partial<AppError>,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  if (error instanceof ZodError) {
    return res.status(400).send({message: 'Os dados fornecidos são inválidos.'})
  }

  console.log(error)

  const statusCode = error.statusCode ?? 500
  const message = error.statusCode ? error.message : 'Internal Server Error'
  return res.status(statusCode).json({ message })

}