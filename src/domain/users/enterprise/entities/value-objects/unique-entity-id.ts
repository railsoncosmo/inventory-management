
export class UniqueEntityId {
  private readonly value: string
  
  constructor(value?: string){
    this.value = value ?? crypto.randomUUID()
  }

  toString(){
    return this.value
  }

  toValue(){
    return this.value
  }

}