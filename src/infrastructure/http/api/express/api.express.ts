import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from '../../../../../swagger.json'
import { Api } from '@/infrastructure/http/api/api'
import { Routes } from '@/infrastructure/http/api/routes/routes'
import { globalError } from '@/infrastructure/http/middleware/global-error'

export class ApiExpress implements Api {
  private app: Express

  private constructor(private routes: Routes[]){
    this.app = express()
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.addRoutes(routes)
    this.app.use(globalError)
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
  }

  public static create(routes: Routes[]){
    return new ApiExpress(routes)
  }

  //Adiciona todas as rotas dos controlladores ao app do express
  private addRoutes(routes: Routes[]){
    routes.forEach((route) => {
      const path = route.getPath()
      const method = route.getMethod()
      const handler = route.getHandler()
      const middlewares = route.getMiddlewares?.() || []

      this.app[method](path, ...middlewares, handler)
    })
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  }
}