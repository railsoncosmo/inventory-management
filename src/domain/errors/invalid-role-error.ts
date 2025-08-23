import { Exception } from '@/domain/errors/exception'

export class InvalidRoleError extends Exception {
  constructor(){
    super('Cargo de usuário inválido', 400 )
  }
}