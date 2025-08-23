import { Exception } from '@/domain/errors/exception'

export class InvalidEmailError extends Exception {
  constructor(){
    super('E-mail inválido', 400 )
  }
}