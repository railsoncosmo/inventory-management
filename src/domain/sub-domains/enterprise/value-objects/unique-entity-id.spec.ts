import { UniqueEntityId } from './unique-entity-id'

describe (('Should create unique entity id'), () => {
  it('Should be able to valid email user', () => {
    const userId = '4e8f48cf-7c00-41fe-aa66-c5e437cc8e06'
    const uniqueId = new UniqueEntityId(userId)

    expect(uniqueId.toValue).toBeDefined()
    expect(uniqueId.toValue).toBeTypeOf('function')
  })
})