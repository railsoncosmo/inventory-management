import { UseCase } from '../usecase'
import { UserGateway } from '../../gateways/user.gateway'
import { BadRequestError } from '@/domain/errors/bad-request-error'

export interface DeleteUserRequest {
  id: string
}

export class DeleteUserUseCase implements UseCase<DeleteUserRequest, void> {
  private constructor(private userGateway: UserGateway){}

  public static create(userGateway: UserGateway): DeleteUserUseCase {
    return new DeleteUserUseCase(userGateway)
  }

  async execute({ id }: DeleteUserRequest): Promise<void> {

    const user = await this.userGateway.findById(id)
    if(!user){
      throw new BadRequestError('Usuário não encontrada.')
    }

    await this.userGateway.delete(id)
  }
}