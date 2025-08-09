import { Exception } from '@/core/entities/exception'

export class ForbiddenError extends Exception {
  constructor(message: string){
    super(message, 403 )
  }
}