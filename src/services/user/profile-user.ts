import { User } from '../../entities/User'
import { userRepository } from '../../repositories/user/user-repository'
import { NotFoundError } from '../../errors/AppError'


interface GetUserProfileRequest {
  userId: string
}

export async function getProfileUser({userId}: GetUserProfileRequest): Promise<User>{

  const user = await userRepository.findOne({
    where: {
      id: userId
    }
  })

  if(!user){
    throw new NotFoundError('Recurso não encontrado.')
  }

  return user
}