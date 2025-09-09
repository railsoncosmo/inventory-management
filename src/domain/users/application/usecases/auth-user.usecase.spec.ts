import dotenv from 'dotenv'
import { InMemoryUsersRepository } from '@/__test__/repositories/in-memory-user-repository'
import { FakeHasher } from '@/__test__/fakes/fake-hash'
import { AuthUserUseCase } from './auth-user.usecase'
import { FakeTokenGenerator } from '@/__test__/fakes/fake-token'
import { FakeDateProvider } from '@/__test__/fakes/fake-dayjs'
import { InMemoryTokenRepository } from '@/__test__/repositories/in-memory-token-repository'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { makeUser } from '@/__test__/mocks/user.mock'

dotenv.config({
  path: '.env.test',
  override: true,
})

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryTokenRepository: InMemoryTokenRepository
let mockHashing: FakeHasher
let mockTokenGenerator: FakeTokenGenerator
let mockDateProvider: FakeDateProvider
let sut: AuthUserUseCase

describe('Authentication User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryTokenRepository = new InMemoryTokenRepository()
    mockHashing = new FakeHasher()
    mockTokenGenerator = new FakeTokenGenerator()
    mockDateProvider = new FakeDateProvider()
    sut = AuthUserUseCase.create(
      inMemoryUsersRepository, 
      mockHashing, mockTokenGenerator, 
      inMemoryTokenRepository, 
      mockDateProvider
    )
  })

  it('Shold be able to authentication user', async () => {
    const user = await makeUser(mockHashing)
    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      email: 'user_test@hotmail.com',
      password: '123123'
    })

    expect(result.token).toEqual(expect.any(String))
    expect(result.refresh_token).toEqual(expect.any(String))
    expect(result.token).toBeTruthy()
    expect(result.refresh_token).toBeTruthy()
  })

  it('should throw InvalidCredentialsError when user does not exist', async () => {
    const user = await makeUser(mockHashing)
    await inMemoryUsersRepository.create(user)

    const InvalidCredentials = {
      email: 'user_not_exists@hotmail.com',
      password: '123123'
    }

    await expect(sut.execute(InvalidCredentials))
      .rejects.toThrowError(InvalidCredentialsError)
  })
  it('should throw InvalidCredentialsError when password is incorrect', async () => {
    const user = await makeUser(mockHashing)
    await inMemoryUsersRepository.create(user)

    const InvalidCredentials = {
      email: 'user_test@hotmail.com',
      password: 'passwordIncorrect'
    }

    await expect(sut.execute(InvalidCredentials))
      .rejects.toThrowError(InvalidCredentialsError)
  })

  it('should save refresh token in repository with hash value', async () => {
    const user = await makeUser(mockHashing)
    await inMemoryUsersRepository.create(user)

    const { refresh_token } = await sut.execute({
      email: 'user_test@hotmail.com',
      password: '123123'
    })
    const refreshTokenHashed = await mockHashing.hash(refresh_token as string)

    expect(refresh_token).not.toBe(refreshTokenHashed)
  })
})