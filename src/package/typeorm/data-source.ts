import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { env } from '../../config/env'
import { User } from '../../infra/database/typeorm/entities/User'
import { Product } from '../../infra/database/typeorm/entities/Product'
import { Inventory } from '../../infra/database/typeorm/entities/Inventory'
import { Transaction } from '../../infra/database/typeorm/entities/Transaction'
import { Category } from '../../infra/database/typeorm/entities/Category'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [User, Product, Inventory, Transaction, Category],
  migrations: [__dirname + '/../../infrastructure/database/typeorm/migrations/*.{ts,js}'],
})