import { Email } from '@/domain/sub-domains/enterprise/value-objects/email.vo'
import { FakeHasher } from '../fakes/fake-hash'
import { Role } from '@/domain/sub-domains/enterprise/value-objects/role.vo'
import { User } from '@/domain/sub-domains/enterprise/entities/user.entity'


export async function makeUser(
  hasher: FakeHasher,
  override: Partial<{
    name: string
    email: string
    password: string
    image_url: string
    phone: string
    role: string
  }> = {}
) {
  const hashedPassword = await hasher.hash(override.password || '123123')
  
  const userData = {
    name: override.name || 'John Doe',
    email: new Email(override.email || 'user_test@hotmail.com'),
    password: hashedPassword,
    phone: override.phone || '85999999999',
    role: new Role(override.role || 'admin'),
  }
  
  return User.create(userData)
}
