import { UseCase } from '../usecase'
import { User } from '@/domain/sub-domains/enterprise/entities/user.entity'
import { UserGateway } from '@/domain/sub-domains/application/gateways/user.gateway'
import { UserAlreadyExistsError } from '@/domain/errors/user-already-exists-error'
import { Hashing } from '@/domain/interfaces/hasher'
import { Email } from '../../../enterprise/value-objects/email.vo'
import { Role } from '../../../enterprise/value-objects/role.vo'

export interface CreateUserRequest {
  name: string
  email: string
  password: string
  image_url?: string
  phone: string
  role: 'admin' | 'user'
}

export interface CreateUserResponse {
  user: User
}

export class CreateUserUseCase implements UseCase<CreateUserRequest, CreateUserResponse> {
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
  }: CreateUserRequest): Promise<CreateUserResponse>{

    const passwordHashed = await this.encrypter.hash(password)

    const userAlreadyExists = await this.userGateway.countBy(email)
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
    await this.userGateway.create(user)

    return { user }
  }
}