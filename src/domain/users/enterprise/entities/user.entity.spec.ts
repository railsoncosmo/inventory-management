import { mockUser } from '@/__test__/mocks/user.request.mock'
import { User } from './user.entity'
import { Email } from '../value-objects/email.vo'
import { Role } from '../value-objects/role.vo'

describe('User Entity', () => {
  
  it('Should be able to create user entity', async () => {
    const { name, email, password, phone, image_url, role } = mockUser()
    
    const user = User.create({
      name: name,
      email: new Email(email),
      password: password,
      phone: phone,
      image_url: image_url,
      role: new Role(role)
    })

    expect(user.id).toBeDefined()
  })
})