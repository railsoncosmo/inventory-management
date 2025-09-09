import { InMemoryUsersRepository } from '@/__test__/repositories/in-memory-user-repository'
import { GetProfileUsecase } from './get-profile.usecase'
import { makeUser } from '@/__test__/mocks/user.mock'
import { FakeHasher } from '@/__test__/fakes/fake-hash'
import { BadRequestError } from '@/domain/errors/bad-request-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let mockHashing: FakeHasher
let sut: GetProfileUsecase

describe('Create User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    mockHashing = new FakeHasher()
    sut = GetProfileUsecase.create(inMemoryUsersRepository)
  })

  it('Shold be able to create user', async () => {
    const userData = await makeUser(mockHashing)
    await inMemoryUsersRepository.create(userData)

    const user = await sut.execute({ user_id: userData.id })

    expect(user).toBeDefined()
    expect(user).not.toBeNull()
    expect(user).toBeTruthy()
  })

  it('should call repository with the provided user_id exactly once', async () => {
    const userData = await makeUser(mockHashing)
    await inMemoryUsersRepository.create(userData)

    const spy = vi.spyOn(inMemoryUsersRepository, 'getCurrentUser')

    await sut.execute({ user_id: userData.id })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(userData.id)
  })

  it('Shold be able to create user', async () => {
    await expect(sut.execute({ user_id: 'no-exists-id' }))
      .rejects.toBeInstanceOf(BadRequestError)
  })
})