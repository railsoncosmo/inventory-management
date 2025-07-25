import 'express-async-errors'
import 'dotenv/config'
import express from 'express'
import { AppDataSource } from './config/data-source'
import { env } from './config/env' 
import { routes } from './http/routes'
import { globalError } from './http/middleware/global-error'

AppDataSource.initialize().then(() => {
  
  const app = express()

  app.use(express.json())
  app.use('/v1', routes)
  app.use(globalError)

  app.listen(env.PORT, () => {
    console.log('Server Running!')
  })
})