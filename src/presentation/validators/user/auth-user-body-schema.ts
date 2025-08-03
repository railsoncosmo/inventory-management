import { z } from 'zod'

export const authUserBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})