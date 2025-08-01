import { AppError } from './app-error'

export class PermissionNotFoundError extends AppError {
  constructor(){
    super('Permissão não encontrada para esse usuário.', 400 )
  }
}