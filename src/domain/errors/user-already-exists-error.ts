import { Exception } from '@/domain/errors/exception'

export class UserAlreadyExistsError extends Exception {
  constructor(){
    super('E-mail já está cadastrado.', 400 )
  }
}