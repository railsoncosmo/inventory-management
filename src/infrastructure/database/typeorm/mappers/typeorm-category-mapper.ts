import { Category } from '@/domain/sub-domains/enterprise/entities/category.entity'
import { Category as CategoryOrm } from '../entities/Category'
import { UniqueEntityId } from '@/domain/sub-domains/enterprise/value-objects/unique-entity-id'
import { CreateCategoryResponse } from '@/domain/sub-domains/application/usecases/category/create-category.usecase'


export class TypeormCategoryMapper {
  static toDomain(raw: CategoryOrm): Category {
    return Category.create({
      name: raw.name,
      displayName: raw.displayName,
    }, new UniqueEntityId(raw.id), raw.created_at, raw.updated_at)
  }

  static toCategoryPublic(raw: CategoryOrm): CreateCategoryResponse {
    return {
      id: new UniqueEntityId(raw.id).toValue(),
      name: raw.name,
      displayName: raw.displayName,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    }
  }
}