import { GetProfileInputDto, GetProfileOutputDto } from '@/domain/dto/user/get-profile.dto'
import { UseCase } from './usecase'
import { UserGateway } from '../gateways/user.gateway'
import { UserPresenters } from '@/domain/ports/in/user.present'
import { BadRequestError } from '@/domain/errors/bad-request-error'

export class GetProfileUsecase implements UseCase<GetProfileInputDto, GetProfileOutputDto>{
  private constructor(
    private readonly userGateway: UserGateway,
    private readonly userPresenters: UserPresenters
  ){}

  public static create(userGateway: UserGateway, userPresenters: UserPresenters){
    return new GetProfileUsecase(userGateway, userPresenters)
  }

  async execute({ user_id }: GetProfileInputDto): Promise<GetProfileOutputDto> {
    const user = await this.userGateway.getCurrentUser(user_id)

    if(!user){
      throw new BadRequestError('Usuário não encontrado')
    }

    await this.userPresenters.presentCurrentProfile(user)

    return {
      user
    }
  }
}