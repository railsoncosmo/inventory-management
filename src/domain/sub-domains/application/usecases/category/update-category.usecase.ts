import { UseCase } from '../usecase'
import { CategoryGateway } from '../../gateways/category.gateway'
import { NotFoundError } from '@/domain/errors/not-found-error'
import { Category } from '@/domain/sub-domains/enterprise/entities/category.entity'
import { BadRequestError } from '@/domain/errors/bad-request-error'

export interface UpdateCategoryRequest {
  id: string
  name: string
}

export type UpdateCategoryResponse = Category;

export class UpdateCategoryUseCase implements UseCase<UpdateCategoryRequest, UpdateCategoryResponse> {
  private constructor(private categoryGateway: CategoryGateway){}

  public static create(categoryGateway: CategoryGateway): UpdateCategoryUseCase {
    return new UpdateCategoryUseCase(categoryGateway)
  }

  async execute({ id, name }: UpdateCategoryRequest): Promise<Category> {

    const categoryAlreadyExists = await this.categoryGateway.findById(id)
    if(!categoryAlreadyExists){
      throw new NotFoundError('Categoria selecionada não encontrada.')
    }

    if(categoryAlreadyExists.name === name){
      throw new BadRequestError('O nome fornecido já existe. Por favor, escolha um nome diferente.')
    }

    const updatedCategory: Partial<Category> = {
      name: name,
      displayName: name.toUpperCase()
    }

    const updated = await this.categoryGateway.update(id, updatedCategory)

    return updated
  }
}