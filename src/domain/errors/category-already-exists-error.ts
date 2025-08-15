import { Exception } from '@/domain/errors/exception'

export class CategoryAlreadyExistsError extends Exception {
  constructor(){
    super('Categoria E-mail já está cadastrado.', 400 )
  }
}