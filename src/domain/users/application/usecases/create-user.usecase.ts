import { UseCase } from './usecase'
import { User } from '@/domain/users/enterprise/entities/user.entity'
import { UserGateway } from '@/domain/users/application/gateways/user.gateway'
import { UserAlreadyExistsError } from '@/domain/errors/user-already-exists-error'
import { Hashing } from '@/domain/ports/out/hasher'
import { CreateUserInputDto, CreateUserOutputDto } from '@/domain/dto/user/create-user.dto'
import { Email } from '../../enterprise/entities/value-objects/email'
import { Role } from '../../enterprise/entities/value-objects/role'

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

    const user = User.create({
      name,
      email: new Email(email),
      password: passwordHashed,
      phone,
      role: new Role(role),
    })
    await this.userGateway.save(user)

    return { user }
  }
}