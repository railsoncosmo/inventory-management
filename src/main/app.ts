import { AppDataSource } from '@/package/typeorm/data-source'
import { ApiExpress } from '@/infrastructure/http/api/express/api.express'

import { createRepositories } from '@/infrastructure/database/repository-container'

import { BcryptHash } from '@/infrastructure/providers/bcrypt'
import { JwtToken } from '@/infrastructure/providers/jwt'
import { DayJs } from '@/infrastructure/providers/dayjs'

import { userRoutes } from './container/user'
import { tokenRoutes } from './container/refresh-token'

export async function server(){
  const dataSource = await AppDataSource.initialize()

  const repositories = createRepositories(dataSource)
  const encrypter = new BcryptHash()
  const tokenProvider = new JwtToken()
  const dateProvider = new DayJs()

  const routes = [
    ...userRoutes({ repositories, encrypter, tokenProvider, dateProvider }),
    ...tokenRoutes({ repositories, encrypter ,tokenProvider, dateProvider })
  ]
  const api = ApiExpress.create(routes)

  return api
}

server()
