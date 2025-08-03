import { User } from '../../../core/domain/entities/user/user.entity'
import { UserGateway } from '../../../core/domain/entities/user/user.gateway'
import { UseCase } from '../usecase'
import { UserAlreadyExistsError } from '../../../application/errors/user-already-exists-error'
import { Hashing } from '../../ports/hasher'
import { CreateUserInputDto, CreateUserOutputDto } from '../../dto/user/create-user.dto'

export class CreateUserUseCase implements UseCase<CreateUserInputDto, CreateUserOutputDto> {
  private constructor(
    private readonly userGateway: UserGateway,
    private readonly encrypter: Hashing,
  ){}

  public static create(userGateway: UserGateway, hashing: Hashing){
    return new CreateUserUseCase(userGateway, hashing)
  }

  async execute({
    name,
    email,
    password,
    phone,
    role
  }: CreateUserInputDto): Promise<CreateUserOutputDto>{

    const passwordHashed = await this.encrypter.hashPassword(password)

    const userAlreadyExists = await this.userGateway.countByEmail(email)
    if(userAlreadyExists){
      throw new UserAlreadyExistsError()
    }

    const user = User.create(name, email, passwordHashed, phone, role)
    return await this.userGateway.save(user)
  }
}