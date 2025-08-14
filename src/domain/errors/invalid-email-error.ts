import { Exception } from '@/domain/errors/exception'

export class InvalidEmailError extends Exception {
  constructor(){
    super(' inválidas.', 400 )
  }
}