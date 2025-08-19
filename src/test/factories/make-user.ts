import { CreateUserUseCase } from '@/domain/users/application/usecases/create-user.usecase'
import { FakeHasher } from '../fakes/fake-hash'
import { InMemoryUsersRepository } from '../repositories/in-memory-user-repository'
import { CreateUserInputDto } from '@/domain/dto/user/create-user.dto'

const repo = new InMemoryUsersRepository()
const hasher = new FakeHasher()
const createUserUseCase = CreateUserUseCase.create(repo, hasher)

type Override = Partial<CreateUserInputDto>

export async function makeUser(override: Override = {}) {

  const data: CreateUserInputDto = {
    name: 'user test create',
    email: 'user_email@teste.com',
    password: '123123',
    phone: '85999999999',
    role: 'admin'
  }

  const result = await createUserUseCase.execute({
    ...data,
    ...override
  })

  return result.user
}
