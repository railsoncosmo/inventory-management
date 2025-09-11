import { InvalidRoleError } from '@/domain/errors/invalid-role-error'
import { Role } from './role.vo'

describe (('Role Value Object'), () => {
  it('Should be able to valid email user', () => {
    const role = new Role('admin')

    expect(role.value).toBeDefined()
    expect(role.value).toBe('admin')
  })

  it('Should throw InvalidRoleError for invalid role', () => {
    expect(() => {
      new Role('collaborator')
    }).toThrowError(InvalidRoleError)
  
    expect(() => {
      new Role('collaborator')
    }).toThrowError('Cargo de usuário inválido')
  })
})