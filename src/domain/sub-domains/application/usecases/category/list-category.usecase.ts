import { UseCase } from '../usecase'
import { CategoryGateway } from '../../gateways/category.gateway'
import { BadRequestError } from '@/domain/errors/bad-request-error'
import { Category } from '@/domain/sub-domains/enterprise/entities/category.entity'

export interface ListCategoryResponse {
  category: Category
}

export class ListCategoryUseCase implements UseCase<void, ListCategoryResponse[]> {
  private constructor(private categoryGateway: CategoryGateway){}

  public static create(categoryGateway: CategoryGateway): ListCategoryUseCase {
    return new ListCategoryUseCase(categoryGateway)
  }

  async execute(): Promise<ListCategoryResponse[]> {

    const categories = await this.categoryGateway.findAll()
    if (categories.length === 0) {
      throw new BadRequestError('Categoria não encontrada.')
    }

    return categories.map(category => ({ category }))
  }
}