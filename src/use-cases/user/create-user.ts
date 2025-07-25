import { UserAlreadyExistsError } from '../errors/AppError'
import { userRepository } from '../../infra/repositories/typeorm/typeorm-user-repository'
import { hash } from 'bcryptjs'
import { UserRole } from '../../enums/roles'


interface CreateUserRequest {
  name: string
  email: string
  password: string
  phone: string
  image_url?: string
  role: UserRole
}

export async function createUserService({
  name, 
  email, 
  password, 
  phone, 
  image_url, 
  role}: CreateUserRequest){

  const password_hash = await hash(password, 10)

  const userAlreadyExists = await userRepository.findOneBy({
    email: email
  })

  if(userAlreadyExists){
    throw new UserAlreadyExistsError()
  }

  const user = userRepository.create({
    name,
    email,
    password: password_hash,
    phone,
    image_url,
    role
  })

  await userRepository.save(user)
}