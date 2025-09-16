import { UseCase } from '../usecase'
import { CategoryGateway } from '../../gateways/category.gateway'
import { BadRequestError } from '@/domain/errors/bad-request-error'

export interface DeleteCategoryRequest {
  id: string
}

export class DeleteCategoryUseCase implements UseCase<DeleteCategoryRequest, void> {
  private constructor(private categoryGateway: CategoryGateway){}

  public static create(categoryGateway: CategoryGateway): DeleteCategoryUseCase {
    return new DeleteCategoryUseCase(categoryGateway)
  }

  async execute({ id }: DeleteCategoryRequest): Promise<void> {

    const category = await this.categoryGateway.findById(id)
    if(!category){
      throw new BadRequestError('Categoria não encontrada.')
    }

    await this.categoryGateway.delete(id)
  }
}