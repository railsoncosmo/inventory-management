import { Hashing } from '@/domain/interfaces/hasher'

export class FakeHasher implements Hashing {
  async hash(password: string): Promise<string> {
    return `hashed-${password}`
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return hashedPassword === `hashed-${password}`
  }
}