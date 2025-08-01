import { z } from 'zod'

export const createUserBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
  phone: z.string(),
  image_url: z.url().optional(),
  role: z.enum(['ADMIN', 'USER']),
})