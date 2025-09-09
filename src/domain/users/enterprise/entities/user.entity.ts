import { Email } from '../value-objects/email.vo'
import { Entity } from '@/core/entities/core.entity'
import { UniqueEntityId } from '../value-objects/unique-entity-id'
import { Role } from '../value-objects/role.vo'
import { Optional } from '@/core/types/optional'
import { GetProfileOutputDto } from '@/domain/dto/user/get-profile.dto'

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

  public asPublic(): GetProfileOutputDto{
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      image_url: this.image_url,
      role: this.role,
      created_at: this.created_at,
    }
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
