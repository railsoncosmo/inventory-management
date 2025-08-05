import { env } from '../config/env'
import { AppDataSource } from '../package/typeorm/data-source'
import { createRepositories } from '../infra/database/repository-container'

import { BcryptHash } from '../infra/services/bcrypt'
import { JwtToken } from '../infra/services/jwt'

import { ApiExpress } from '../infra/http/api/express/api.express'
import { userRoutes } from './routes/user.routes'

export async function server(){
  const dataSource = await AppDataSource.initialize()

  const repositories = createRepositories(dataSource)
  const encrypter = BcryptHash.create()
  const tokenGenerator = new JwtToken(env.JWT_SECRET)

  const routes = userRoutes({ repositories, encrypter, tokenGenerator })
  const api = ApiExpress.create(routes)

  return api
}

server()

