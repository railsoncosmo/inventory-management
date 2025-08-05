import { AppError } from './app-error'

export class RefrashTokenNotExists extends AppError {
  constructor(){
    super('Refresh token não existe.', 400 )
  }
}