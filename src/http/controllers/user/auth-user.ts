import { Request, Response } from 'express'
import { z } from 'zod'
import { InvalidCredentialsError } from '../../../use-cases/errors/AppError'
import { authUserService } from '../../../use-cases/user/auth-user'
import { sign } from 'jsonwebtoken'
import { env } from '../../../config/env'

export async function authUser(req: Request, res: Response){

  const createUserBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6)
  })

  const { email, password } = createUserBodySchema.parse(req.body)

  try {
    const { user } = await authUserService({
      email,
      password
    })
    
    const token = sign(
      {},
      env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '8d'
      }
    )

    return res.status(200).send({ token })

  } catch(error){

    if (error instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: error.message })
    }

    throw error
  }
}