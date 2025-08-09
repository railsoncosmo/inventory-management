import { Exception } from '@/core/entities/exception'

export class RefreshTokenNotExists extends Exception {
  constructor(){
    super('Refresh token expirado.', 400 )
  }
}