import { User } from '../../entities/User'
import { userRepository } from '../../repositories/user/user-repository'
import { NotFoundError } from '../../errors/AppError'


interface GetUserProfileRequest {
  userId: string
}

interface GetUserProfileResponse {
  user: User
}

export async function getProfileUser({userId}: GetUserProfileRequest): Promise<GetUserProfileResponse>{

  const user = await userRepository.findOne({
    where: {
      id: userId
    }
  })

  if(!user){
    throw new NotFoundError('Recurso não encontrado.')
  }

  return {
    user
  }
}