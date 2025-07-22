import { Router } from 'express'
import { userRoute } from './user.routes'
import { categoryRoute } from './category.route'

export const routes = Router()

routes.use(userRoute)
routes.use(categoryRoute)