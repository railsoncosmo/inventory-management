import { Exception } from '@/domain/errors/exception'

export class NotFoundError extends Exception {
  constructor(message: string){
    super(message, 404 )
  }
}