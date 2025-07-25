import { NotFoundError } from '../errors/AppError'
import { userRepository } from '../../infra/repositories/typeorm/typeorm-user-repository'

interface UpdateUserRequest {
  userId: string
  name: string
  email: string
  phone: string
  image_url?: string
}

export async function updateUserService({userId, name, email, phone, image_url}: UpdateUserRequest){

  const user = await userRepository.findOne({
    where: {
      id: userId
    }
  })

  if(!user){
    throw new NotFoundError('Recurso não encontrados')
  }

  const updatedUser = await userRepository.save({
    id: userId,
    name,
    email,
    phone,
    image_url,
  })

  return updatedUser
}