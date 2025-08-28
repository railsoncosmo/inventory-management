import { Token } from './token.entity'

describe('Token Entity', () => {
  
  it('Should be able to create token user', () => {
    const token = Token.create({
      expires_date: new Date(2025, 11, 31),
      refresh_token: crypto.randomUUID(),
      user_id: crypto.randomUUID(),
      created_at: new Date()
    })

    expect(token.id).toBeDefined()
    expect(token.expires_date).toBeDefined()
    expect(token.refresh_token).toBeDefined()
    expect(token.user_id).toBeDefined()
  })
})