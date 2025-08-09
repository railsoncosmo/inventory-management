import { Exception } from '@/core/entities/exception'

export class UnauthorizedError extends Exception {
  constructor(message: string){
    super(message, 401 )
  }
}