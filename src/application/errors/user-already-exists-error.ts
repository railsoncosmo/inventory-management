import { Exception } from '@/core/entities/exception'

export class UserAlreadyExistsError extends Exception {
  constructor(){
    super('E-mail já está cadastrado.', 400 )
  }
}