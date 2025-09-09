import { Entity } from '@/core/entities/core.entity'
import { UniqueEntityId } from '../value-objects/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface TokenProps {
  user_id: string
  expires_date: Date
  refresh_token: string
  created_at: Date
}

export class Token extends Entity<TokenProps> {

  public static create(props: Optional<TokenProps, 'created_at'>, id?: UniqueEntityId){
    const token = new Token({
      ...props,
      created_at: new Date()
    }, id)

    return token
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