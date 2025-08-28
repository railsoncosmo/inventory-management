import dotenv from 'dotenv'
import { FakeHasher } from '@/__test__/fakes/fake-hash'
import { RefreshTokenUseCase } from './refresh-token.usecase'
import { FakeTokenGenerator } from '@/__test__/fakes/fake-token'
import { FakeDateProvider } from '@/__test__/fakes/fake-dayjs'
import { InMemoryTokenRepository } from '@/__test__/repositories/in-memory-token-repository'
import { makeToken } from '@/__test__/mocks/token.mock'
import { makeUser } from '@/__test__/mocks/user.mock'
import { Token } from '../../enterprise/entities/token.entity'
import { RefreshTokenNotExists } from '@/domain/errors/refesh-token-not-exists-error'

dotenv.config({
  path: '.env.test',
  override: true,
})

let inMemoryTokenRepository: InMemoryTokenRepository
let mockHashing: FakeHasher
let mockTokenGenerator: FakeTokenGenerator
let mockDateProvider: FakeDateProvider
let sut: RefreshTokenUseCase

describe('Authentication User Use Case', () => {
  beforeEach(() => {
    inMemoryTokenRepository = new InMemoryTokenRepository()
    mockHashing = new FakeHasher()
    mockTokenGenerator = new FakeTokenGenerator()
    mockDateProvider = new FakeDateProvider()
    sut = RefreshTokenUseCase.create(
      inMemoryTokenRepository, 
      mockTokenGenerator, 
      mockHashing,
      mockDateProvider,
    )
  })

  it('Should throw error if refresh token not exists', async () => {
    const refreshToken = 'invalid-refresh-token-value'

    await expect(sut.execute({ refresh_token: refreshToken }))
      .rejects.toThrow(RefreshTokenNotExists)
  })

  it('Shold be able to return null if the user is not found', async () => {
    const { id } = await makeUser(mockHashing)
    const result = await inMemoryTokenRepository.findByUserIdAndRefreshToken(id)

    expect(result).toBeNull()
  })
  
  it('Shold be able to generate refresh token', async () => {
    const refreshTokenData = await makeToken(mockHashing, { refresh_token: '123123' })
    const result = await inMemoryTokenRepository.create(refreshTokenData)
    
    expect(result).not.toBe('123123')
  })

  it('Shold be able to return user', async () => {
    const user = await makeUser(mockHashing)
    const refreshTokenData = await makeToken(mockHashing, { user_id: user.id })
    await inMemoryTokenRepository.create(refreshTokenData)
    
    const result = await inMemoryTokenRepository.findByUserIdAndRefreshToken(refreshTokenData.user_id)

    expect(result?.user_id).toBe(user.id)
    expect(result).toBeInstanceOf(Token)
  })
})