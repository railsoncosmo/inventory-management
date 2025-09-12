import { UseCase } from '../usecase'
import { UserGateway } from '../../gateways/user.gateway'
import { BadRequestError } from '@/domain/errors/bad-request-error'
import { User } from '@/domain/sub-domains/enterprise/entities/user.entity'

export interface GetProfileRequest {
  user_id: string
}

export type GetProfileResponse = Omit<User, 'password' | 'asPublic'>

export class GetProfileUsecase implements UseCase<GetProfileRequest, GetProfileResponse>{
  private constructor(
    private readonly userGateway: UserGateway,
  ){}

  public static create(userGateway: UserGateway){
    return new GetProfileUsecase(userGateway)
  }

  async execute({ user_id }: GetProfileRequest): Promise<GetProfileResponse> {
    const user = await this.userGateway.getCurrentUser(user_id)

    if(!user){
      throw new BadRequestError('Usuário não encontrado')
    }

    return user
  }
}