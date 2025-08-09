import { AppDataSource } from '@/package/typeorm/data-source'
import { ApiExpress } from '@/infrastructure/http/api/express/api.express'

import { createRepositories } from '@/infrastructure/database/repository-container'

import { BcryptHash } from '@/infrastructure/services/bcrypt'
import { JwtToken } from '@/infrastructure/services/jwt'
import { DayJs } from '@/infrastructure/services/dayjs'

import { userRoutes } from './container/user'
import { tokenRoutes } from './container/refresh-token'

export async function server(){
  const dataSource = await AppDataSource.initialize()

  const repositories = createRepositories(dataSource)
  const encrypter = BcryptHash.create()
  const tokenProvider = new JwtToken()
  const dateProvider = new DayJs()

  const routes = [
    ...userRoutes({ repositories, encrypter, tokenProvider, dateProvider }),
    ...tokenRoutes({ repositories, tokenProvider, dateProvider })
  ]
  const api = ApiExpress.create(routes)

  return api
}

server()

