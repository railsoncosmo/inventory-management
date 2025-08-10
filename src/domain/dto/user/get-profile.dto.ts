export interface GetProfileInputDto {
  user_id: string
}

export interface GetProfileOutputDto {
  name: string
  email: string
  phone: string
  image_url?: string
  role: string
  created_at?: Date
}