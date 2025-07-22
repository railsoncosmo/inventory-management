import { AppDataSource } from '../../config/data-source'
import { Category } from '../../entities/Category'

export const categoryRepository = AppDataSource.getRepository(Category).extend({
  
  findByName(name: string) {
    return this.createQueryBuilder('categories')
      .where('LOWER(categories.name) = :name', { name: name.toLowerCase().trim() })
      .getOne()
  }
})
