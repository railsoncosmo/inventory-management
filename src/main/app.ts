import { AppDataSource } from '../package/typeorm/data-source'
import { createRepositories } from '../infra/database/repository-container'

import { BcryptHash } from '../infra/services/bcrypt'
import { JwtToken } from '../infra/services/jwt'

import { ApiExpress } from '../infra/http/api/express/api.express'
import { userRoutes } from './routes/user.routes'
import { DayJs } from '../infra/services/dayjs'

export async function server(){
  const dataSource = await AppDataSource.initialize()

  const repositories = createRepositories(dataSource)
  const encrypter = BcryptHash.create()
  const tokenGenerator = new JwtToken()
  const dateProvider = new DayJs()

  const routes = userRoutes({ repositories, encrypter, tokenGenerator, dateProvider })
  const api = ApiExpress.create(routes)

  return api
}

server()

