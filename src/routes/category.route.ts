import { Router } from 'express'
import { createCategory } from '../controllers/category/create-category'
import { authentication } from '../middleware/auth'

export const categoryRoute = Router()

categoryRoute.post('/categories', authentication ,createCategory)