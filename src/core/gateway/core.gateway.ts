
export interface CoreGateway<T> {
  create(data: T): Promise<void>
  findAll(): Promise<T[]>
  findById(id: string): Promise<T | null>
  countBy(param: string): Promise<number>
  update(id: string, data: Partial<T>): Promise<T>
  delete(id: string): Promise<void>
}