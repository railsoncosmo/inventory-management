import { Exception } from '@/domain/errors/exception'

export class ForbiddenError extends Exception {
  constructor(message: string){
    super(message, 403 )
  }
}