import 'dotenv/config'
import 'reflect-metadata'
import path from 'node:path'
import { DataSource } from 'typeorm'
import { env } from '@/config/env'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [path.resolve(__dirname + '/../../infrastructure/database/typeorm/entities/*.{ts,js}')],
  migrations: [path.resolve(__dirname + '/../../infrastructure/database/typeorm/migrations/*.{ts,js}')],
})