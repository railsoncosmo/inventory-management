import { Exception } from '@/core/entities/exception'

export class InvalidCredentialsError extends Exception {
  constructor(){
    super('Credenciais inválidas.', 400 )
  }
}