import { Exception } from '@/domain/errors/exception'

export class RefreshTokenNotExists extends Exception {
  constructor(){
    super('Refresh token expirado.', 400 )
  }
}