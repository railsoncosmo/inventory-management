import { Router } from 'express'
import { userRoute } from './user.routes'

export const routes = Router()

routes.use(userRoute)