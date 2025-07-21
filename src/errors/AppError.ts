export class AppError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number){
    super(message)
    this.statusCode = statusCode
  }
}

export class BadRequestError extends AppError {
  constructor(message: string){
    super(message, 400 )
  }
}

export class NotFoundError extends AppError {
  constructor(message: string){
    super(message, 404 )
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string){
    super(message, 401 )
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string){
    super(message, 403 )
  }
}

export class UserAlreadyExistsError extends AppError {
  constructor(){
    super('E-mail já existe.', 400 )
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(){
    super('Credenciais inválidas.', 400 )
  }
}

export class PermissionNotFoundError extends AppError {
  constructor(){
    super('Permissão não encontrada para esse usuário.', 400 )
  }
}