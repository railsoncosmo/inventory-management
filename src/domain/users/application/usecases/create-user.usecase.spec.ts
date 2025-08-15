import { BcryptHash } from '@/infrastructure/services/bcrypt'
import { CreateUserUseCase } from '@/domain/users/application/usecases/create-user.usecase'
import { InMemoryUsersRepository } from '../../../../../test/repositories/in-memory-user-repository'
import { UserAlreadyExistsError } from '@/domain/errors/user-already-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    const encrypter = BcryptHash.create()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = CreateUserUseCase.create(inMemoryUsersRepository, encrypter)
  })

  it('Shold be able to create user', async () => {
    const { user } = await sut.execute({
      name: 'Railson Cosmo',
      email: 'railson@teste.com',
      password: '123123',
      phone: '85992169883',
      role: 'admin'
    })

    expect(user.id).toBeDefined()
    expect(inMemoryUsersRepository.user[0].id).toEqual(user.id)
    expect(user.password).not.toBe('123123')
  })

  it('Should throw error if user already exists', async () => {
    await sut.execute({
      name: 'Railson Cosmo',
      email: 'railson@teste.com',
      password: '123123',
      phone: '85992169883',
      role: 'admin'
    })

    try {
      await sut.execute({
        name: 'Outro Nome',
        email: 'railson@teste.com',
        password: 'abc123',
        phone: '85999999999',
        role: 'user'
      })
    } catch (error) {
      expect(error).toBeInstanceOf(UserAlreadyExistsError)
    }
  })
})