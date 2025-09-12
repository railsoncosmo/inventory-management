import { Entity } from '@/core/entities/core.entity'
import { UniqueEntityId } from '@/domain/sub-domains/enterprise/value-objects/unique-entity-id'
import { CreateCategoryResponse } from '../../application/usecases/category/create-category.usecase'


interface CategoryProps {
  name: string
  displayName: string
}

export class Category extends Entity<CategoryProps>{

  public static create(
    props: CategoryProps, 
    id?: UniqueEntityId, 
    created_at?: Date, 
    updated_at?: Date
  ){
    const category = new Category({
      ...props,
    }, id, created_at, updated_at)

    return category
  }

  public asPublic(): CreateCategoryResponse {
    return {
      id: this.id,
      name: this.name,
      displayName: this.displayName,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }

  public update(props: Partial<CategoryProps>) {
    if (props.name !== undefined) {
      this.props.name = props.name
    }
    if (props.displayName !== undefined) {
      this.props.displayName = props.displayName
    }
    
    this.touch()
  }

  get name() {
    return this.props.name
  }
  
  get displayName() {
    return this.props.displayName
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set displayName(displayName: string) {
    this.props.displayName = displayName
    this.props.name = displayName.toLowerCase()
    this.touch()
  }
}