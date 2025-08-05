import { TokenGateway } from '../../../core/domain/entities/token/token.gateway'
import { RefreshTokenInputDto, RefreshTokenOutputDto } from '../../dto/user/create-user-token.dto'
import { TokenGenerator } from '../../ports/token'
import { TokenVerifier } from '../../ports/token'
import { UseCase } from '../usecase'
import { RefrashTokenNotExists } from '../../errors/refesh-token-not-exists-error'
import { DateProvider } from '../../ports/date'
import { env } from '../../../config/env'
import { UserPresenters } from '../../presenter/user.present'


interface Payload {
  sub: string
}

export class RefreshTokenUseCase implements UseCase<RefreshTokenInputDto, RefreshTokenOutputDto> {
  private constructor(
    private readonly tokenGateway: TokenGateway,
    private readonly userPresenters: UserPresenters,
    private readonly tokenVerifier: TokenVerifier,
    private readonly tokenGenerator: TokenGenerator,
    private readonly dateProvider: DateProvider,
  ){}

  public static create(
    tokenGateway: TokenGateway,
    userPresenters: UserPresenters,
    tokenVerifier: TokenVerifier,
    tokenGenerator: TokenGenerator,
    dateProvider: DateProvider,
  ){
    return new RefreshTokenUseCase(
      tokenGateway,
      userPresenters,
      tokenVerifier,
      tokenGenerator,
      dateProvider,
    )
  }

  async execute({ token }: RefreshTokenInputDto): Promise<RefreshTokenOutputDto> {
    const { sub } = await this.tokenVerifier.verifyRefreshToken(token) as unknown as Payload
    const user_id = sub

    const userToken = await this.tokenGateway.findByUserIdAndRefreshToken(token, user_id)
    if(!userToken){
      throw new RefrashTokenNotExists()
    }

    await this.tokenGateway.deleteByTokenId(userToken.id)
    
    const refresh_token = await this.tokenGenerator.generateRefreshToken({
      sub: sub,
    })
    
    const expiresRefreshToken = this.dateProvider.addDays(env.EXPIRES_REFRESH_TOKEN_DAYS)
    
    const newRefreshToken = await this.tokenGateway.create({
      user_id: sub,
      refresh_token,
      expires_date: expiresRefreshToken,
    })

    return this.userPresenters.presentRefreshToken(newRefreshToken)
  }
}