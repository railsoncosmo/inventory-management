import { User } from '@/domain/sub-domains/enterprise/entities/user.entity'
import { UseCase } from '../usecase'
import { UserGateway } from '../../gateways/user.gateway'
import { BadRequestError } from '@/domain/errors/bad-request-error'

export interface UpdateUserRequest {
  id: string
  name?: string
  email?: string
  image_url?: string
  phone?: string
}

export interface UpdateUserResponse {
  user: Partial<User>
}

export class UpdateUserUseCase implements UseCase<UpdateUserRequest, UpdateUserResponse>{
  private constructor(private readonly userGateway: UserGateway){}

  public static create(userGateway: UserGateway): UpdateUserUseCase{
    return new UpdateUserUseCase(userGateway)
  }

  async execute(data: UpdateUserRequest): Promise<UpdateUserResponse> {

    const userAlreadyExists = await this.userGateway.findById(data.id)
    if(!userAlreadyExists){
      throw new BadRequestError('Usuário não encontrada.')
    }

    const updatedUser: Partial<User> = {
      name: data.name,
      email: data.email,
      image_url: data.image_url,
      phone: data.phone,
    }

    const user = await this.userGateway.update(data.id, updatedUser)

    return {
      user
    }
  }
}