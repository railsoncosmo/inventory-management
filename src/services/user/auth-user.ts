import { compare } from 'bcryptjs'
import { User } from '../../entities/User'
import { InvalidCredentialsError } from '../../errors/AppError'
import { userRepository } from '../../repositories/user/user-repository'


interface AuthUserRequest {
  email: string
  password: string
}

interface AuthUserResponse {
  user: User
}

export async function authUserService({email, password}: AuthUserRequest): Promise<AuthUserResponse>{
  const user = await userRepository.findOne({
    where: {
      email
    }
  })

  if(!user){
    throw new InvalidCredentialsError()
  }

  const doesPasswordMatches = await compare(password, user.password)
  
  if(!doesPasswordMatches){
    throw new InvalidCredentialsError()
  }

  return {
    user
  }
}