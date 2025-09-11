import { Entity } from '@/core/entities/core.entity'
import { UniqueEntityId } from '@/domain/sub-domains/enterprise/value-objects/unique-entity-id'


interface CategoryProps {
  name: string
  displayName: string
}

export class Category extends Entity<CategoryProps>{

  public static create(props: CategoryProps, id?: UniqueEntityId){
    const category = new Category({
      ...props,
    }, id)

    return category
  }

  get name() {
    return this.props.name
  }
  
  get displayName() {
    return this.props.name
  }

  set displayName(displayName: string) {
    this.props.displayName = displayName
    this.props.name = displayName.toLowerCase()
  }
}