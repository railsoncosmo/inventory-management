import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  JWT_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  EXPIRES_REFRESH_TOKEN_DAYS: z.coerce.number(),
  PORT: z.coerce.number().default(3333),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string()
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false){
  console.log('Invalid environment variables!', _env.error.format())

  throw new Error('Invalid environment variables!')
}

export const env = _env.data