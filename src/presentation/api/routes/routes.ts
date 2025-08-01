import { Request, Response } from 'express'

export type HttpMethod = 'get' | 'post' | 'delete' | 'put' | 'patch'

export const httpMethod = {
  GET: 'get' as HttpMethod,
  POST: 'post' as HttpMethod,
  DELETE: 'delete' as HttpMethod,
  PUT: 'put' as HttpMethod,
  PATH: 'path' as HttpMethod,
} as const

export interface Routes {
  getHandler(): (req: Request, res: Response) => Promise<void>
  getPath(): string
  getMethod(): HttpMethod
}