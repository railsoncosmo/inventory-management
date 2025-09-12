import { Email } from '../value-objects/email.vo'
import { Entity } from '@/core/entities/core.entity'
import { UniqueEntityId } from '../value-objects/unique-entity-id'
import { Role } from '../value-objects/role.vo'
import { GetProfileResponse } from '../../application/usecases/user/get-profile.usecase'

interface UserProps {
  name: string
  email: Email
  password: string
  phone: string
  role: Role
  image_url?: string
}

export class User extends Entity<UserProps> {
  
  public static create(
    props: UserProps, 
    id?: UniqueEntityId, 
    created_at?: Date, 
    updated_at?: Date
  ){
    const user = new User({
      ...props,
      email: new Email(props.email.value),
      role: new Role(props.role.value),
    }, id, created_at, updated_at)

    return user
  }

  public asPublic(): GetProfileResponse {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      image_url: this.image_url,
      role: this.role,
      created_at: this.created_at,
      updated_at: this.updated_at
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

  set name(name: string){
    this.props.name = name
  }

  set password(password: string){
    this.props.password = password
  }

  set phone(phone: string){
    this.props.phone = phone
  }

  set image_url(image: string){
    this.props.image_url = image
  }
}
