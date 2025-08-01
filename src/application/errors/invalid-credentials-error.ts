import { AppError } from './app-error'

export class InvalidCredentialsError extends AppError {
  constructor(){
    super('Credenciais inválidas.', 400 )
  }
}