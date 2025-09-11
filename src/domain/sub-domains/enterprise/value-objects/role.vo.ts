import { UserRole } from '@/enums/roles'
import { InvalidRoleError } from '@/domain/errors/invalid-role-error'

export class Role {
  private readonly _value: string

  constructor(value: string){
    Role.isValidRole(value)
    this._value = value
  }

  private static isValidRole(value: string){
    const roles = Object.values(UserRole) as string[]
    if (!roles.includes(value)){
      throw new InvalidRoleError()
    }
  }

  get value(): string {
    return this._value
  }

  toString(): string {
    return this._value
  }
} 