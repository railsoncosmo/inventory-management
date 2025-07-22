import { Category } from '../../entities/Category'
import { CategoryAlreadyExistsError } from '../../errors/AppError'
import { categoryRepository } from '../../repositories/category/category-repository'

interface CreateCategoryRequest {
  name: string
}

export async function createCategoryService({name}: CreateCategoryRequest): Promise<Category>{

  const category = name.trim().toLowerCase()
  const displayName = name.trim()
  const categoryAlreadyExists = await categoryRepository.findByName(category)

  if(categoryAlreadyExists){
    throw new CategoryAlreadyExistsError()
  }

  const createCategory = categoryRepository.create({
    name: category,
    displayName
  })

  const newCategory = await categoryRepository.save(createCategory)

  return newCategory
}