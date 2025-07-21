import { Request, Response } from 'express'
import { z } from 'zod'
import { createUserService } from '../../services/user/create-user'
import { UserAlreadyExistsError } from '../../errors/AppError'
import { UserRole } from '../../shared/types/roles'

export async function createUser(req: Request, res: Response){

  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    phone: z.string(),
    image_url: z.url().optional(),
    role: z.enum(UserRole),
  })

  const { name, email, password, phone, role, image_url } = createUserBodySchema.parse(req.body)

  try {
    await createUserService({
      name,
      email,
      password,
      image_url,
      phone,
      role
    })

    return res.status(201).send()
    
  } catch(error){

    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: error.message })
    }

    throw error
  }
}