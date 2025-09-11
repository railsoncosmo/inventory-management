import { GetProfileInputDto, GetProfileOutputDto } from '@/domain/dto/user/get-profile.dto'
import { UseCase } from '../usecase'
import { UserGateway } from '../../gateways/user.gateway'
import { BadRequestError } from '@/domain/errors/bad-request-error'

export class GetProfileUsecase implements UseCase<GetProfileInputDto, GetProfileOutputDto>{
  private constructor(
    private readonly userGateway: UserGateway,
  ){}

  public static create(userGateway: UserGateway){
    return new GetProfileUsecase(userGateway)
  }

  async execute({ user_id }: GetProfileInputDto): Promise<GetProfileOutputDto> {
    const user = await this.userGateway.getCurrentUser(user_id)

    if(!user){
      throw new BadRequestError('Usuário não encontrado')
    }

    return user
  }
}