import { BadRequestError } from '../../errors/AppError'
import { userRepository } from '../../repositories/user/user-repository'
import { hash } from 'bcryptjs'


interface CreateUserRequest {
  name: string
  email: string
  password: string
  phone: string
  image_url?: string
  role: 'admin' | 'user'
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
    throw new BadRequestError('E-mail já está cadastrado.')
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