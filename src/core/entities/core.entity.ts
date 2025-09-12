import { UniqueEntityId } from '@/domain/sub-domains/enterprise/value-objects/unique-entity-id'

export class Entity<T> {
  private readonly _id: UniqueEntityId
  private readonly _created_at: Date
  private  _updated_at?: Date
  protected props: T

  protected constructor(props: T, id?: UniqueEntityId, created_at?: Date, updated_at?: Date){
    this._id = id ?? new UniqueEntityId()
    this._created_at = created_at ?? new Date()
    this._updated_at = updated_at ?? new Date()
    this.props = props
  }

  get id() {
    return this._id.toValue()
  }

  get created_at() {
    return this._created_at
  }

  get updated_at() {
    return this._updated_at
  }

  protected touch() {
    this._updated_at = new Date()
  }
}