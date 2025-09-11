
export type CreateCategoryInputDto = {
  name: string
}

export type CreateCategoryOutputDto = {
  id: string;
  name: string;
  displayName: string;
  created_at: Date;
  updated_at?: Date;
}