import { Request, Response } from 'express'
import { httpMethod, HttpMethod, Routes } from '../../routes/routes'
import { JwtToken } from '../../../../services/jwt'

export type CreateUserResponseDto = {
  id: string
}

export class RefreshTokenRoute implements Routes {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly jwtService: JwtToken,
  ){}

  public static create(jwtService: JwtToken){
    return new RefreshTokenRoute(
      '/refresh/token',
      httpMethod.PATCH,
      jwtService,
    )
  }

  getHandler() {
    return async (req: Request, res: Response) => {

      const refreshToken = req.cookies?.refreshToken
      const userId = req.user_id
      
      await this.jwtService.verifyRefreshToken(refreshToken)
      
      const newAccessToken = this.jwtService.generateAccessToken({ sub: userId })
      const newRefreshToken = this.jwtService.generateRefreshToken({ sub: userId })

      res
        .cookie('refreshToken', newRefreshToken, {
          path: '/',
          secure: true,
          sameSite: true,
          httpOnly: true })
        .status(200)
        .send({ newAccessToken })}
  }
  getPath(): string {
    return this.path
  }

  getMethod(): HttpMethod {
    return this.method
  }
}