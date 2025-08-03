import { AppError } from './app-error'

export class CategoryAlreadyExistsError extends AppError {
  constructor(){
    super('Categoria E-mail já está cadastrado.', 400 )
  }
}