import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { env } from '../../config/env'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [__dirname + '/../../infra/database/typeorm/entities/*.{ts,js}'],
  migrations: [__dirname + '/../../infra/database/typeorm/migrations/*.{ts,js}'],
})