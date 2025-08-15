import bcrypt from 'bcryptjs'
import { Hashing } from '@/domain/ports/out/hasher'

export class BcryptHash implements Hashing {
  private constructor(private readonly salt: number = 6){}

  public static create(salt?: number) {
    return new BcryptHash(salt)
  }

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.salt)
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compareSync(password, hashedPassword)
  }
}