import { UseCase } from './usecase'
import { TokenGateway } from '@/domain/users/application/gateways/token.gateway'
import { TokenProvider } from '@/domain/ports/out/token'
import { DateProvider } from '@/domain/ports/out/date'
import { UserPresenters } from '@/domain/ports/in/user.present'
import { RefreshTokenInputDto, RefreshTokenOutputDto } from '@/domain/dto/user/token-user.dto'
import { RefreshTokenNotExists } from '@/domain/errors/refesh-token-not-exists-error'
import { env } from '@/config/env'


interface Payload {
  sub: string
}

export class RefreshTokenUseCase implements UseCase<RefreshTokenInputDto, RefreshTokenOutputDto> {
  private constructor(
    private readonly tokenGateway: TokenGateway,
    private readonly userPresenters: UserPresenters,
    private readonly tokenProvider: TokenProvider,
    private readonly dateProvider: DateProvider,
  ){}

  public static create(
    tokenGateway: TokenGateway,
    userPresenters: UserPresenters,
    tokenProvider: TokenProvider,
    dateProvider: DateProvider,
  ){
    return new RefreshTokenUseCase(
      tokenGateway,
      userPresenters,
      tokenProvider,
      dateProvider,
    )
  }

  async execute({ token }: RefreshTokenInputDto): Promise<RefreshTokenOutputDto> {
    const { sub } = await this.tokenProvider.verifyRefreshToken(token) as Payload
    const user_id = sub
    
    const userToken = await this.tokenGateway.findByUserIdAndRefreshToken(user_id, token)
    if(!userToken){
      throw new RefreshTokenNotExists()
    }

    await this.tokenGateway.deleteByTokenId(userToken.id.toString())

    const newAccessToken = await this.tokenProvider.generateAccessToken({
      sub: userToken.id.toString(),
    })
    
    const refresh_token = await this.tokenProvider.generateRefreshToken({
      sub: userToken.id.toString(),
    })
    
    const expiresRefreshToken = this.dateProvider.addDays(env.EXPIRES_REFRESH_TOKEN_DAYS)
    
    const newRefreshToken = await this.tokenGateway.create({
      user_id: sub,
      refresh_token,
      expires_date: expiresRefreshToken,
    })

    return await this.userPresenters.presentAuthUser(newAccessToken, newRefreshToken.refresh_token)
  }
}