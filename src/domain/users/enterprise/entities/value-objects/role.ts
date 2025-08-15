import { UserRole } from '@/domain/enums/roles'

export class Role {
  private readonly _value: string

  constructor(value: string){
    Role.isValidRole(value)
    this._value = value
  }

  private static isValidRole(value: string){
    const roles = Object.values(UserRole) as string[]
    if (!roles.includes(value)){
      throw new Error('Cargo de usuário inválido.')
    }
  }

  get value(): string {
    return this._value
  }

  toString(): string {
    return this._value
  }
} 