import { Request, Response } from 'express'
import { z } from 'zod'
import { createUserService } from '../../services/user/create-user'
import { BadRequestError } from '../../errors/AppError'

export async function createUser(req: Request, res: Response){

  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.email('Digite um email válido.'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
    phone: z.string(),
    image_url: z.url().optional(),
    role: z.enum(['admin', 'user']),
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
    if (error instanceof BadRequestError) {
      return res.status(400).json({ message: error.message })
    }
  }
}