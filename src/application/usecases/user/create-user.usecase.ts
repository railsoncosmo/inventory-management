import { User } from '@/domain/entities/user.entity'
import { UserGateway } from '@/application/gateways/user.gateway'
import { UseCase } from '@/application/usecases/usecase'
import { UserAlreadyExistsError } from '@/application/errors/user-already-exists-error'
import { Hashing } from '@/application/ports/out/hasher'
import { CreateUserInputDto, CreateUserOutputDto } from '@/application/dto/user/create-user.dto'

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