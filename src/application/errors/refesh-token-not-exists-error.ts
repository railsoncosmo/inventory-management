import { AppError } from './app-error'

export class RefreshTokenNotExists extends AppError {
  constructor(){
    super('Refresh token não existe.', 400 )
  }
}