import { Category } from '@/domain/sub-domains/enterprise/entities/category.entity'

export type CreateCategoryInputDto = {
  name: string
}

export type CreateCategoryOutputDto = {
  user: Category
}