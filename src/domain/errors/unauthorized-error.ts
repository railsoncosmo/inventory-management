import { Exception } from '@/domain/errors/exception'

export class UnauthorizedError extends Exception {
  constructor(message: string){
    super(message, 401 )
  }
}