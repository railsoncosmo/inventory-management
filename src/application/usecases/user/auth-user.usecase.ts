import { UserGateway } from '../../../core/domain/entities/user/user.gateway'
import { AuthUserInputDto, AuthUserOutputDto } from '../../dto/user/auth-user.dto'
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error'
import { Hashing } from '../../ports/hasher'
import { TokenGenerator } from '../../ports/token'
import { UserPresenters } from '../../presenter/user.present'
import { UseCase } from '../usecase'

export class AuthUserUseCase implements UseCase<AuthUserInputDto, AuthUserOutputDto>{
  private constructor(
    private readonly userGateway: UserGateway,
    private readonly encrypter: Hashing,
    private readonly userPresenters: UserPresenters,
    private readonly tokenGenerator: TokenGenerator
  ){}

  public static create(userGateway: UserGateway, encrypter: Hashing, userPresenters: UserPresenters, tokenGenerator: TokenGenerator){
    return new AuthUserUseCase(userGateway, encrypter, userPresenters, tokenGenerator)
  }

  async execute({ email, password }: AuthUserInputDto): Promise<AuthUserOutputDto> {

    const user = await this.userGateway.find(email)
    if(!user){
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await this.encrypter.comparePassword(password, user.password)
    if(!doesPasswordMatches){
      throw new InvalidCredentialsError()
    }

    const accessToken = await this.tokenGenerator.generateAccessToken({
      sub: user.id,
    })

    const refreshToken = await this.tokenGenerator.generateRefreshToken({
      sub: user.id,
    })

    return this.userPresenters.presentAuthUser(accessToken, refreshToken)
  }
}