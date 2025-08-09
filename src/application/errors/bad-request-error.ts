import { Exception } from '@/core/entities/exception'

export class BadRequestError extends Exception {
  constructor(message: string){
    super(message, 400 )
  }
}