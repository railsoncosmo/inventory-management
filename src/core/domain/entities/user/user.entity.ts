
export type UserProps = {
  id: string
  name: string
  email: string
  password: string
  phone: string
  image_url?: string
  role: string
  created_at?: Date
  updated_at?: Date
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
    if(!this.props.role || this.props.role.trim() === ''){
      throw new Error('User must have a role')
    }
  }

  public changeRole(newRole: string){
    if(this.props.role === newRole){
      throw new Error('User already belongs this role')
    }
    this.props.role = newRole
    this.props.updated_at = new Date()
  }
  
  public get id(){
    return this.props.id
  }

  public get name(){
    return this.props.name
  }

  public get email(){
    return this.props.email
  }

  public get password(){
    return this.props.password
  }

  public get phone(){
    return this.props.phone
  }

  public get role(){
    return this.props.role
  }

}