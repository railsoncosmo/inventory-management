import { faker } from '@faker-js/faker'
import { CreateUserInputDto } from '@/domain/dto/user/create-user.dto'

type Override = Partial<CreateUserInputDto>

export const mockUser = (override: Override = {}): CreateUserInputDto => {
  const { name, email, password, phone, image_url } = override ?? {}

  const user: CreateUserInputDto = {
    name: name ?? faker.person.fullName(),
    email: email ?? faker.internet.email(),
    password: password ?? faker.internet.password(),
    phone: phone ?? faker.phone.number({ style: 'national' }),
    image_url: image_url ?? faker.image.urlLoremFlickr(),
    role: 'admin',
  }
  return user
}