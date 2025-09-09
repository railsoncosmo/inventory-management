import { Entity } from './core.entity'
import { User } from '@/domain/users/enterprise/entities/user.entity'
import { Email } from '@/domain/users/enterprise/value-objects/email.vo'
import { Role } from '@/domain/users/enterprise/value-objects/role.vo'
import { mockUser } from '@/__test__/mocks/create-user.request.mock'

describe (('Should create core entity'), () => {
  it('Should be able to create entity generic', () => {
    const { name, email, password, phone, image_url, role } = mockUser()
        
    const user = User.create({
      name: name,
      email: new Email(email),
      password: password,
      phone: phone,
      image_url: image_url,
      role: new Role(role)
    })

    expect(user).toBeInstanceOf(Entity)
    
  })
})