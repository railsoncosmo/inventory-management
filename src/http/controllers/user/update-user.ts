import { Request, Response } from 'express'
import { z } from 'zod'
import { BadRequestError } from '../../../use-cases/errors/AppError'
import { updateUserService } from '../../../use-cases/user/update-user'

export async function updateUser(req: Request, res: Response){

  const updateUserBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    phone: z.string(),
    image_url: z.url().optional(),
  })

  const { name, email, phone, image_url } = updateUserBodySchema.parse(req.body)
  const userId = req.user_id

  try {
    const user = await updateUserService({
      userId,
      name,
      email,
      phone,
      image_url,
    })

    return res.status(200).send({user})
    
  } catch {
    throw new BadRequestError('Erro ao atualizar os dados.')
  }
}