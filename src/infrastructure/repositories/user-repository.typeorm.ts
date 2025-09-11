import { Repository } from 'typeorm'
import { User } from '@/domain/sub-domains/enterprise/entities/user.entity'
import { UserGateway } from '@/domain/sub-domains/application/gateways/user.gateway'
import { User as UserOrm } from '../database/typeorm/entities/User'
import { UserRole } from '@/enums/roles'
import { TypeormUserMapper } from '../database/typeorm/mappers/typeorm-user-mapper'
import { GetProfileOutputDto } from '@/domain/dto/user/get-profile.dto'
import { NotFoundError } from '@/domain/errors/not-found-error'

export class UserTypeormRepository implements UserGateway {
  constructor(private readonly userRepository: Repository<UserOrm>) {}

  public static build(userRepository: Repository<UserOrm>) {
    return new UserTypeormRepository(userRepository)
  }

  async create(user: User): Promise<void> {
    const data = {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      role: user.role as UserRole,
    }

    const newUser = this.userRepository.create(data)
    await this.userRepository.save(newUser)
  }

  async countBy(email: string): Promise<number> {
    return await this.userRepository.count({ where: { email } })
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) return null
    return TypeormUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) return null
    return TypeormUserMapper.toDomain(user)
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find()

    return users.map(user => TypeormUserMapper.toDomain(user))
  }
  
  async update(id: string, data: Partial<User>): Promise<User> {
    const updated = {
      name: data.name,
      phone: data.phone,
      image_url: data.image_url
    }

    await this.userRepository.update(id, updated)
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundError('Usuário não encontrado.')
    }
    return TypeormUserMapper.toDomain(user)
  }
  
  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }

  async getCurrentUser(user_id: string): Promise<GetProfileOutputDto | null> {
    const user = await this.userRepository.findOne({ where: { id: user_id },
      select: ['id' ,'name', 'email', 'phone', 'image_url', 'role', 'created_at']
    })
    if (!user) return null
    return TypeormUserMapper.toUserPublic(user)
  }
}
