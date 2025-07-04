import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export const globalError = (
  error: Error & Partial<AppError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : 'Internal Server Error'
  return res.status(statusCode).json({ message })

}