
interface TokenProps {
  id: string
  user_id: string
  expires_date: Date
  refresh_token: string
  created_at?: Date
}

export class Token {
  private constructor(private props: TokenProps){}

  public static create(expires_date: Date, refresh_token: string, user_id: string){
    return new Token({
      id: crypto.randomUUID(),
      user_id,
      refresh_token,
      expires_date,
    })
  }

  public static withToken(props: TokenProps){
    return new Token(props)
  }
  
  public get id(){
    return this.props.id
  }

  public get user_id(){
    return this.props.user_id
  }

  public get expires_date(){
    return this.props.expires_date
  }

  public get refresh_token(){
    return this.props.refresh_token
  }
}