export type GetProfileInputDTO = {
  userId: string
}

export type GetProfileOutputDTO = {
  id: string
  name: string
  email: string
  phone: string
  image_url?: string
  role: string
  created_at?: Date
}