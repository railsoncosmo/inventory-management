import { UseCase } from '@/application/usecases/usecase'
import { TokenGateway } from '@/application/gateways/token.gateway'
import { UserGateway } from '@/application/gateways/user.gateway'
import { AuthUserInputDto, AuthUserOutputDto } from '@/application/dto/user/auth-user.dto'
import { InvalidCredentialsError } from '@/application/errors/invalid-credentials-error'
import { DateProvider } from '@/application/ports/out/date'
import { Hashing } from '@/application/ports/out/hasher'
import { TokenProvider } from '@/application/ports/out/token'
import { UserPresenters } from '@/application/ports/in/user.present'
import { env } from '@/config/env'

export class AuthUserUseCase implements UseCase<AuthUserInputDto, AuthUserOutputDto>{
  private constructor(
    private readonly userGateway: UserGateway,
    private readonly encrypter: Hashing,
    private readonly userPresenters: UserPresenters,
    private readonly tokenProvider: TokenProvider,
    private readonly tokenGateway: TokenGateway,
    private readonly dateProvider: DateProvider,
  ){}

  public static create(
    userGateway: UserGateway, 
    encrypter: Hashing, 
    userPresenters: UserPresenters, 
    tokenProvider: TokenProvider, 
    tokenGateway: TokenGateway,
    dateProvider: DateProvider
  ){
    return new AuthUserUseCase(
      userGateway, 
      encrypter, 
      userPresenters, 
      tokenProvider, 
      tokenGateway,
      dateProvider
    )
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

    const accessToken = await this.tokenProvider.generateAccessToken({
      sub: user.id,
    })

    const refreshToken = await this.tokenProvider.generateRefreshToken({
      sub: user.id,
    })

    const expiresRefreshToken = this.dateProvider.addDays(env.EXPIRES_REFRESH_TOKEN_DAYS)

    await this.tokenGateway.deleteAllByUserId(user.id)

    await this.tokenGateway.create({
      user_id: user.id,
      refresh_token: refreshToken,
      expires_date: expiresRefreshToken,
    })

    return this.userPresenters.presentAuthUser(accessToken, refreshToken)
  }
}