// import { UserGateway } from '../../../core/domain/entities/user/user.gateway'
// import { GetProfileInputDTO, GetProfileOutputDTO } from '../../dto/user/get-profile.dto'
// import { UserPresenters } from '../../presenter/user.present'
// import { UseCase } from '../usecase'

// export class GetProfileUserUseCase implements UseCase<GetProfileInputDTO, GetProfileOutputDTO>{
//   private constructor(
//     private readonly userGateway: UserGateway,
//     private readonly userPresenters: UserPresenters,
//   ){}

//   public static create(userGateway: UserGateway, userPresenters: UserPresenters){
//     return new GetProfileUserUseCase(userGateway, userPresenters)
//   }

//   async execute({ userId }: GetProfileInputDTO): Promise<GetProfileOutputDTO>{
//     const user = await this.userGateway.getUserProfile(userId)

//     return this.userPresenters.presentProfileUser(user)
//   }
// }