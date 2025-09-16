/* eslint-disable @typescript-eslint/no-explicit-any */
import { Repository, ObjectLiteral } from 'typeorm'

export interface BaseMapper<T, K> {
  toDomain(entity: K): T
  toOrm(domain: Partial<T>): K
}

export abstract class CoreRepository<T, K extends ObjectLiteral> {
  protected constructor(
    protected readonly ormRepository: Repository<K>,
    protected readonly mapper: BaseMapper<T, K>,
  ) {}

  async create(data: Partial<T>): Promise<T> {
    const ormEntity = this.ormRepository.create(this.mapper.toOrm(data))
    await this.ormRepository.save(ormEntity)
    return this.mapper.toDomain(ormEntity)
  }

  async findAll(): Promise<T[]> {
    const ormEntities = await this.ormRepository.find()
    return ormEntities.map(entity => this.mapper.toDomain(entity))
  }

  async findById(id: string): Promise<T | null> {
    const ormEntity = await this.ormRepository.findOne({ 
      where: { id: id as any }
    })
    return ormEntity ? this.mapper.toDomain(ormEntity) : null
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}