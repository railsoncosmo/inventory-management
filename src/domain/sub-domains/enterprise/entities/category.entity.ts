import { Entity } from '@/core/entities/core.entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/domain/sub-domains/enterprise/value-objects/unique-entity-id'


interface CategoryProps {
  name: string
  displayName: string
  created_at: Date
  updated_at: Date | null
}

export class Category extends Entity<CategoryProps>{

  public static create(props: Optional<CategoryProps, 'created_at'>, id?: UniqueEntityId){
    const category = new Category({
      ...props,
      created_at: props.created_at ?? new Date()
    }, id)

    return category
  }

  get name() {
    return this.props.name
  }

  get displayName() {
    return this.props.displayName
  }

  get createdAt() {
    return this.props.created_at
  }

  private updatedAt() {
    return this.props.updated_at = new Date()
  }
}