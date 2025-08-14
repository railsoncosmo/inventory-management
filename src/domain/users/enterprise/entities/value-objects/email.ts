import { InvalidEmailError } from '@/domain/errors/invalid-email-error'

export class Email {
  private readonly _value: string

  constructor(value: string){
    if(!Email.isValidEmail(value)){
      throw new InvalidEmailError()
    }
    this._value = value
  }

  private static isValidEmail(value: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(value)
  }

  get value(): string {
    return this._value
  }

  toString(): string {
    return this._value
  }
} 