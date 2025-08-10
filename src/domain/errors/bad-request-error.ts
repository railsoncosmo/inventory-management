import { Exception } from '@/domain/errors/exception'

export class BadRequestError extends Exception {
  constructor(message: string){
    super(message, 400 )
  }
}