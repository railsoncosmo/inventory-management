import { User } from '../../entities/User'
import { userRepository } from '../../infra/repositories/typeorm/typeorm-user-repository'
import { NotFoundError } from '../errors/AppError'


interface GetUserProfileRequest {
  userId: string
}

export async function getProfileUser({userId}: GetUserProfileRequest): Promise<User>{

  const user = await userRepository.findOne({
    where: {
      id: userId
    },
    select: ['id', 'name', 'email', 'image_url', 'phone', 'role', 'created_at', 'products', 'products']
  })

  if(!user){
    throw new NotFoundError('Recurso não encontrado.')
  }

  return user
}