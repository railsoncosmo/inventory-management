import { z } from 'zod'

export const createCategoryBodySchema = z.object({
  name: z.string().min(4, 'O nome é obrigatório e deve ter no mínimo 4 caracteres.'),
})