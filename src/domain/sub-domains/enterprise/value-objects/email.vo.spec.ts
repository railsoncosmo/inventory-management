import { InvalidEmailError } from '@/domain/errors/invalid-email-error'
import { Email } from './email.vo'

describe (('Email Value Object'), () => {
  it('Should be able to valid email user', () => {
    const email = new Email('user_email@teste.com')

    expect(email.value).toBeDefined()
    expect(email.value).toBe('user_email@teste.com')
  })

  it('Should throw InvalidEmailError for invalid email', () => {
    expect(() => {
      new Email('email-invalido')
    }).toThrowError(InvalidEmailError)

    expect(() => {
      new Email('email-invalido')
    }).toThrowError('E-mail inválido') 
  })
})