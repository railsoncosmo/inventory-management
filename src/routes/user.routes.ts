import { Router } from 'express'
import { createUser } from '../controllers/user/create-user'

export const userRoute = Router()

userRoute.post('/users', createUser)