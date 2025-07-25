import { Request, Response } from 'express'
import { z } from 'zod'
import { createCategoryService } from '../../../use-cases/category/create-category'
import { getProfileUser } from '../../../use-cases/user/profile-user'
import { UnauthorizedError } from '../../../use-cases/errors/AppError'
import { getUserPermission } from '../../../utils/get-user-permission'

export async function createCategory(req: Request, res: Response){

  const createCategoryBodySchema = z.object({
    name: z.string(),
  })

  const userId = req.user_id
  const { name } = createCategoryBodySchema.parse(req.body)

  try{

    const user = await getProfileUser({userId})
    const ability = getUserPermission(userId, user.role)

    if(ability.cannot('create', 'Category')){
      throw new UnauthorizedError('Você não tem permissão para criar categoria')
    }

    const category = await createCategoryService({
      name
    })

    return res.status(201).send({ category })

  } catch(error) {
    if (error instanceof UnauthorizedError) {
      return res.status(401).send({ error: error.message })
    }

    throw error
  }
}