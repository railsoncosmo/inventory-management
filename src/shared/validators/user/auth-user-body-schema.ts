import { z } from 'zod'

export const authUserBodySchema = z.object({
  email: z.email('Insira um e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
})