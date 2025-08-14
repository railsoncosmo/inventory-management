import { z } from 'zod'

export const createUserBodySchema = z.object({
  name: z.string(),
  email: z.email('Insira um e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  phone: z.string(),
  image_url: z.url().optional(),
  role: z.enum(['admin', 'user']),
})