import { Exception } from '@/domain/errors/exception'

export class PermissionNotFoundError extends Exception {
  constructor(){
    super('Permissão não encontrada para esse usuário.', 400 )
  }
}