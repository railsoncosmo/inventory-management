import { InMemoryUsersRepository } from '@/__test__/repositories/in-memory-user-repository'
import { mockUser } from '@/__test__/mocks/user.request.mock'
import { FakeHasher } from '@/__test__/fakes/fake-hash'
import { CreateUserUseCase } from './create-user.usecase'
import { UserAlreadyExistsError } from '@/domain/errors/user-already-exists-error'
import { User } from '@/domain/users/enterprise/entities/user.entity'
import { InvalidEmailError } from '@/domain/errors/invalid-email-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let mockHashing: FakeHasher
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    mockHashing = new FakeHasher()
    sut = CreateUserUseCase.create(inMemoryUsersRepository, mockHashing)
  })

  it('Shold be able to create user', async () => {
    const newUser = mockUser()
    const { user } = await sut.execute(newUser)
    await inMemoryUsersRepository.save(user)

    expect(user.id).toBeDefined()
    expect(user.name).toBe(newUser.name)
    expect(user.email).toBe(newUser.email)
    expect(user.phone).toBe(newUser.phone)
    expect(user.role).toBe(newUser.role)
    expect(user).toBeInstanceOf(User)
  })

  it('Should throw error if user already exists', async () => {
    const newUser = mockUser()
    await sut.execute(newUser)

    await expect(sut.execute(newUser))
      .rejects.toThrowError(UserAlreadyExistsError)
  })

  it('Should throw error if invalid email', async () => {
    const invalidUser = mockUser({ email: 'email-invalid' })

    await expect(sut.execute(invalidUser))
      .rejects.toThrowError(InvalidEmailError)
  })

  it('Should hash password before saving', async () => {
    const newUser = mockUser({ password: '123123'})
    const { user } = await sut.execute(newUser)

    expect(user.password).toBe('hashed-123123')
    expect(user.password).not.toBe('123123')
  })

  it('Should save user in repository', async () => {
    const newUser = mockUser()
    await sut.execute(newUser)

    const user = await inMemoryUsersRepository.find(newUser.email)

    expect(user).toBeDefined()
    expect(user?.email).toBe(user?.email)
  })
})