import { UseCase } from '@/application/usecases/usecase'
import { TokenGateway } from '@/application/gateways/token.gateway'
import { TokenProvider } from '@/application/ports/out/token'
import { DateProvider } from '@/application/ports/out/date'
import { UserPresenters } from '@/application/ports/in/user.present'
import { RefreshTokenInputDto, RefreshTokenOutputDto } from '@/application/dto/user/create-user-token.dto'
import { RefreshTokenNotExists } from '@/application/errors/refesh-token-not-exists-error'
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
    const { sub } = await this.tokenProvider.verifyToken(token) as unknown as Payload
    const user_id = sub

    const userToken = await this.tokenGateway.findByUserIdAndRefreshToken(user_id, token)
    if(!userToken){
      throw new RefreshTokenNotExists()
    }

    await this.tokenGateway.deleteByTokenId(userToken.id)

    const newAccessToken = await this.tokenProvider.generateAccessToken({
      sub: userToken.id,
    })
    
    const refresh_token = await this.tokenProvider.generateRefreshToken({
      sub: sub,
    })
    
    const expiresRefreshToken = this.dateProvider.addDays(env.EXPIRES_REFRESH_TOKEN_DAYS)
    
    const newRefreshToken = await this.tokenGateway.create({
      user_id: sub,
      refresh_token,
      expires_date: expiresRefreshToken,
    })


    return this.userPresenters.presentAuthUser(newAccessToken, newRefreshToken.refresh_token)
  }
}