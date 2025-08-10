import { UseCase } from './usecase'
import { TokenGateway } from '@/domain/users/application/gateways/token.gateway'
import { UserGateway } from '@/domain/users/application/gateways/user.gateway'
import { AuthUserInputDto, AuthUserOutputDto } from '@/domain/dto/user/auth-user.dto'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { DateProvider } from '@/domain/ports/out/date'
import { Hashing } from '@/domain/ports/out/hasher'
import { TokenProvider } from '@/domain/ports/out/token'
import { UserPresenters } from '@/domain/ports/in/user.present'
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

    const newAccessToken  = await this.tokenProvider.generateAccessToken({
      sub: user.id,
    })

    const refresh_token = await this.tokenProvider.generateRefreshToken({
      sub: user.id,
    })

    const expiresRefreshToken = this.dateProvider.addDays(env.EXPIRES_REFRESH_TOKEN_DAYS)

    await this.tokenGateway.deleteAllByUserId(user.id)

    await this.tokenGateway.create({
      user_id: user.id,
      refresh_token,
      expires_date: expiresRefreshToken
    })

    return this.userPresenters.presentAuthUser(newAccessToken, refresh_token)
  }
}