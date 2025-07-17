import { Router } from 'express'
import { createUser } from '../controllers/user/create-user'
import { authUser } from '../controllers/user/auth-user'
import { profile } from '../controllers/user/profile-user'
import { authentication } from '../middleware/authentication'

export const userRoute = Router()

userRoute.post('/users', createUser)
userRoute.post('/session', authUser)
userRoute.get('/profile', authentication, profile)