import express, { Express } from 'express'
import { Api } from '../api'
import { Routes } from '../routes/routes'
import { globalError } from '../../http/middleware/global-error'

export class ApiExpress implements Api {
  private app: Express

  private constructor(private routes: Routes[]){
    this.app = express()
    this.app.use(express.json())
    this.addRoutes(routes)
    this.app.use(globalError)
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

      this.app[method](path, handler)
    })
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  }
}