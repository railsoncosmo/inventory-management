import { User } from './user.entity'
import { Email } from './value-objects/email.vo'
import { Role } from './value-objects/role.vo'

describe('User Entity', () => {
  
  it('Should be able to create user entity', async () => {
    const user = User.create({
      name: 'user test create',
      email: new Email('user_email@teste.com'),
      password: '123123',
      phone: '85999999999',
      role: new Role('admin')
    })

    expect(user.id).toBeDefined()
  })
})