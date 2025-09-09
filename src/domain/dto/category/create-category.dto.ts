import { Category } from "@/domain/users/enterprise/entities/category.entity"

export type CreateCategoryInputDto = {
  name: string
}

export type CreateCategoryOutputDto = {
  user: Category
}