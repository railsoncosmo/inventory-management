import { makeUser } from '@/test/factories/make-user'
import { UserAlreadyExistsError } from '@/domain/errors/user-already-exists-error'

describe('Create User Use Case', () => {

  it('Shold be able to create user', async () => {
    const user = await makeUser()

    expect(user.id).toBeDefined()
    expect(user.name).toBe('user test create')
    expect(user.password).not.toBe('123123')
  })

  it('Should throw error if user already exists', async () => {
    try {
      const userExists = await makeUser({ email: 'user_email@teste.com' })
      await makeUser({ email: userExists.email })
    } catch (error){
      expect(error).toBeInstanceOf(UserAlreadyExistsError)
    }
  })
})