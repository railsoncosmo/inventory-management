import 'dotenv/config'
import 'express-async-errors'
import { server } from './main/app'
import { env } from './config/env'

async function main() {
  const app = await server()
  app.start(env.PORT)
}

main()
