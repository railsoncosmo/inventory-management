import bcrypt from 'bcryptjs'
import { Hashing } from '../../application/ports/hasher'

export class BcryptHash implements Hashing {
  private constructor(private readonly salt: number = 6){}

  public static create(salt?: number) {
    return new BcryptHash(salt)
  }

  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}