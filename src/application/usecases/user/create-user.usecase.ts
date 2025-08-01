import { User } from '../../../core/domain/entities/user/user.entity'
import { UserGateway } from '../../../core/domain/entities/user/user.gateway'
import { UseCase } from '../usecase'
//import { UserAlreadyExistsError } from '../../../application/errors/user-already-exists-error'
import { Hashing } from '../../ports/hasher'
import { CreateUserInputDto, CreateUserOutputDto } from '../../dto/create-user.dto'
import { CreateUserPresenters } from '../../../application/presenter/user.present'

export class CreateUserUseCase implements UseCase<CreateUserInputDto, CreateUserOutputDto> {
  private constructor(
    private readonly userGateway: UserGateway,
    private readonly hashing: Hashing,
    private readonly userPresenters: CreateUserPresenters,
  ){}

  public static create(userGateway: UserGateway, userPresenters: CreateUserPresenters, hashing: Hashing){
    return new CreateUserUseCase(userGateway, hashing, userPresenters)
  }

  async execute({
    name,
    email,
    password,
    phone,
    role
  }: CreateUserInputDto): Promise<CreateUserOutputDto>{

    const passwordHashed = await this.hashing.hash(password)

    // const userAlreadyExists = await this.userGateway.findByEmail(email)
    // if(userAlreadyExists){
    //   throw new UserAlreadyExistsError()
    // }

    const user = User.create(name, email, passwordHashed, phone, role)
    await this.userGateway.save(user)

    return this.userPresenters.present(user)
  }
}