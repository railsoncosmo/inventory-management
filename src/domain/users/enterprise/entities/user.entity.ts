import { UserRole } from '@/domain/enums/roles'

interface UserProps {
  id: string
  name: string
  email: string
  password: string
  phone: string
  image_url?: string
  role: string
  created_at?: Date
  updated_at?: Date | null
}

export class User {
  private constructor(private props: UserProps){
    this.validateUserRole()
  }

  public static create(name: string, email: string, password: string, phone: string, role: string){
    return new User({
      id: crypto.randomUUID(),
      name,
      email,
      password,
      phone,
      role,
    })
  }

  public static withUser(props: UserProps){
    return new User(props)
  }

  private validateUserRole(){
    const roles = Object.values(UserRole) as string[]
    if (!roles.includes(this.props.role)){
      throw new Error('Cargo de usuário inválido.')
    }
  }

  public get id(){
    return this.props.id
  }

  get name(){
    return this.props.name
  }

  get email(){
    return this.props.email
  }

  get password(){
    return this.props.password
  }

  get phone(){
    return this.props.phone
  }

  get image_url(){
    return this.props.image_url ?? ''
  }

  get role(){
    return this.props.role
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
