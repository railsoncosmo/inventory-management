import { Exception } from '@/domain/errors/exception'

export class InvalidCredentialsError extends Exception {
  constructor(){
    super('Credenciais inválidas.', 400 )
  }
}