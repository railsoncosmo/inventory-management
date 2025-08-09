import { Exception } from '@/core/entities/exception'

export class NotFoundError extends Exception {
  constructor(message: string){
    super(message, 404 )
  }
}