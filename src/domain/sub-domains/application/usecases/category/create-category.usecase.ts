import { CategoryGateway } from '../../gateways/category.gateway'
import { UseCase } from '../usecase'
import { CategoryAlreadyExistsError } from '@/domain/errors/category-already-exists-error'
import { Category } from '@/domain/sub-domains/enterprise/entities/category.entity'

export interface CreateCategoryRequest {
  name: string
}

export interface CreateCategoryResponse {
  id: string;
  name: string;
  displayName: string;
  created_at: Date;
  updated_at?: Date;
}

export class CreateCategoryUseCase implements UseCase<CreateCategoryRequest, CreateCategoryResponse>{
  private constructor(
    private readonly categoryGateway: CategoryGateway
  ){}

  public static create(categoryGateway: CategoryGateway){
    return new CreateCategoryUseCase(categoryGateway)
  }

  async execute({ name }: CreateCategoryRequest): Promise<CreateCategoryResponse> {

    const categoryAlreadyExists = await this.categoryGateway.countBy(name)
    if(categoryAlreadyExists){
      throw new CategoryAlreadyExistsError()
    }

    const category = Category.create({
      name: name,
      displayName: name
    })

    await this.categoryGateway.create(category)

    return {
      id: category.id,
      name: category.name,
      displayName: category.displayName,
      created_at: category.created_at,
      updated_at: category.updated_at
    }
  }
}