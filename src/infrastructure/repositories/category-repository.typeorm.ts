import { Repository } from 'typeorm'
import { CategoryGateway } from '@/domain/sub-domains/application/gateways/category.gateway'
import { Category as CategoryOrm } from '../database/typeorm/entities/Category'
import { Category } from '@/domain/sub-domains/enterprise/entities/category.entity'
import { TypeormCategoryMapper } from '../database/typeorm/mappers/typeorm-category-mapper'
import { NotFoundError } from '@/domain/errors/not-found-error'

export class CategoryTypeormRepository implements CategoryGateway {
  constructor(private readonly categoryRepository: Repository<CategoryOrm>) {}

  public static build(categoryRepository: Repository<CategoryOrm>) {
    return new CategoryTypeormRepository(categoryRepository)
  }
  
  async create(category: Category): Promise<void> {
    const data = {
      name: category.name,
      displayName: category.displayName.toUpperCase()
    }

    const newCategory = this.categoryRepository.create(data)
    await this.categoryRepository.save(newCategory)
  }

  async findAll(): Promise<Category[]> {
    const categorys = await this.categoryRepository.find()
    return categorys.map(category => TypeormCategoryMapper.toDomain(category))
  }
    
  async findById(id: string): Promise<Category | null> {
    const category = await this.categoryRepository.findOne({ where: { id } })
    if (!category) return null
    return TypeormCategoryMapper.toDomain(category)
  }
    
  async countBy(name: string): Promise<number> {
    return await this.categoryRepository.count({ where: { name } })
  }

  async update(id: string, data: Partial<Category>): Promise<Category> {
    const updated = {
      name: data.name,
      displayName: data.displayName,
    }
  
    await this.categoryRepository.update(id, updated)
    const category = await this.categoryRepository.findOne({ where: { id },
      select: ['id' ,'name', 'displayName', 'created_at', 'updated_at']
    })
    if (!category) {
      throw new NotFoundError('Categoria selecionada não encontrada.')
    }
    return TypeormCategoryMapper.toDomain(category)
  }

  async delete(id: string): Promise<void> {
    this.categoryRepository.delete(id)
  }
}
