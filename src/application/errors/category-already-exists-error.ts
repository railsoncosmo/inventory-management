import { AppError } from './app-error'

export class CategoryAlreadyExistsError extends AppError {
  constructor(){
    super('Categoria já existe.', 400 )
  }
}