
export type UserProps = {
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

  public withUserPublic(){
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      image_url: this.props.image_url ?? null,
      role: this.role,
    }
  }

  private validateUserRole(){
    const roles = ['ADMIN', 'USER']
    if (!roles.includes(this.props.role)){
      throw new Error('Cargo de usuário inválido.')
    }
  }

  public changeRole(newRole: string){
    if(this.props.role === newRole){
      throw new Error('O usuário já pertence a esse cargo.')
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