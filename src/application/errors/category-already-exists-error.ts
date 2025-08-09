import { Exception } from '@/core/entities/exception'

export class CategoryAlreadyExistsError extends Exception {
  constructor(){
    super('Categoria E-mail já está cadastrado.', 400 )
  }
}