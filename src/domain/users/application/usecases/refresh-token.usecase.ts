import { UseCase } from './usecase'
import { TokenGateway } from '@/domain/users/application/gateways/token.gateway'
import { TokenProvider } from '@/domain/ports/out/token'
import { DateProvider } from '@/domain/ports/out/date'
import { RefreshTokenInputDto } from '@/domain/dto/user/token-user.dto'
import { RefreshTokenNotExists } from '@/domain/errors/refesh-token-not-exists-error'
import { env } from '@/config/env'
import { AuthUserOutputDto } from '@/domain/dto/user/auth-user.dto'
import { Hashing } from '@/domain/ports/out/hasher'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'


interface Payload {
  sub: string
}

export class RefreshTokenUseCase implements UseCase<RefreshTokenInputDto, AuthUserOutputDto> {
  private constructor(
    private readonly tokenGateway: TokenGateway,
    private readonly tokenProvider: TokenProvider,
    private readonly encrypter: Hashing,
    private readonly dateProvider: DateProvider,
  ){}

  public static create(
    tokenGateway: TokenGateway,
    tokenProvider: TokenProvider,
    encrypter: Hashing,
    dateProvider: DateProvider,
  ){
    return new RefreshTokenUseCase(
      tokenGateway,
      tokenProvider,
      encrypter,
      dateProvider,
    )
  }

  async execute(refresh_token: RefreshTokenInputDto): Promise<AuthUserOutputDto> {
    const { sub } = await this.tokenProvider.verifyRefreshToken(refresh_token.refresh_token) as Payload
    const user_id = sub
    
    const userToken = await this.tokenGateway.findByUserIdAndRefreshToken(user_id)
    if(!userToken){
      throw new RefreshTokenNotExists()
    }

    const isRefreshTokenValid = await this.encrypter.compare(refresh_token.refresh_token, userToken.refresh_token)
    if(!isRefreshTokenValid){
      throw new InvalidCredentialsError()
    }
    
    await this.tokenGateway.deleteByTokenId(userToken.id.toString())

    const accessToken = await this.tokenProvider.generateAccessToken({
      sub: user_id,
    })
    
    const refreshToken = await this.tokenProvider.generateRefreshToken({
      sub: user_id,
    })

    const refreshTokenHashed = await this.encrypter.hash(refreshToken)
    
    const expiresRefreshToken = this.dateProvider.addDays(env.EXPIRES_REFRESH_TOKEN_DAYS)
    
    await this.tokenGateway.create({
      user_id: user_id,
      refresh_token: refreshTokenHashed,
      expires_date: expiresRefreshToken,
    })

    return {
      token: accessToken,
      refresh_token: refreshToken
    }
  }
}