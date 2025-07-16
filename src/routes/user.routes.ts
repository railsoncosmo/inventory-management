import { Router } from 'express'
import { createUser } from '../controllers/user/create-user'
import { authUser } from '../controllers/user/auth-user'

export const userRoute = Router()

userRoute.post('/users', createUser)
userRoute.post('/session', authUser)