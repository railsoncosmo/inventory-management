import { Email } from './value-objects/email'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from './value-objects/unique-entity-id'
import { Role } from './value-objects/role'
import { Optional } from '@/core/types/optional'

interface UserProps {
  name: string
  email: Email
  password: string
  phone: string
  role: Role
  image_url?: string
  created_at: Date
  updated_at?: Date | null
}

export class User extends Entity<UserProps> {
  
  public static create(props: Optional<UserProps, 'created_at'>, id?: UniqueEntityId){
    const user = new User({
      ...props,
      email: new Email(props.email.value),
      role: new Role(props.role.value),
      created_at: props.created_at ?? new Date()
    }, id)

    return user
  }

  get name(){
    return this.props.name
  }

  get email() {
    return this.props.email.value
  }

  get password(){
    return this.props.password
  }

  get phone(){
    return this.props.phone
  }

  get role() {
    return this.props.role.value
  }

  get image_url(){
    return this.props.image_url ?? ''
  }

  get created_at(){
    return this.props.created_at
  }

  private updated(){
    this.props.updated_at = new Date()
  }

  set phone(phone: string){
    this.props.phone = phone
    this.updated()
  }

  set image_url(image: string){
    this.props.image_url = image
    this.updated()
  }
}
