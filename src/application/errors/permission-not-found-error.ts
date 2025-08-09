import { Exception } from '@/core/entities/exception'

export class PermissionNotFoundError extends Exception {
  constructor(){
    super('Permissão não encontrada para esse usuário.', 400 )
  }
}