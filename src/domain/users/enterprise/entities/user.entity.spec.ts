import { mockUser } from '@/__test__/mocks/create-user.request.mock'
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
    expect(user.name).toBeDefined()
    expect(user.email).toBeDefined()
    expect(user.password).toBeDefined()
    expect(user.phone).toBeDefined()
    expect(user.image_url).toBeDefined()
    expect(user.role).toBeDefined()
  })

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

    expect(user.asPublic()).toMatchObject({
      id: user.id,
      email: user.email,
      phone: user.phone,
      image_url: user.image_url,
      role: user.role
    })
    expect(user.asPublic).not.toHaveProperty('password')
  })
})