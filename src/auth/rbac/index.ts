import { createMongoAbility, CreateAbility, MongoAbility, AbilityBuilder } from '@casl/ability'
import { z } from 'zod'
import { User } from './models/user'
import { permissions } from './permissions'
import { PermissionNotFoundError } from '../../application/errors/permission-not-found-error'
import { userSubjectSchema } from './subjects/user'
import { productSubjectSchema } from './subjects/product'
import { categorySubjectSchema } from './subjects/category'
import { inventorySubjectSchema } from './subjects/inventory'
import { transactionSubjectSchema } from './subjects/transaction'

const _appAbilitySchema = z.union([
  userSubjectSchema,
  productSubjectSchema,
  categorySubjectSchema,
  inventorySubjectSchema,
  transactionSubjectSchema,
  z.tuple([z.literal('manage'), z.literal('all')])
])

type AppAbilities = z.infer<typeof _appAbilitySchema>

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User){
  const builder = new AbilityBuilder(createAppAbility)
  
  if(typeof permissions[user.role] !== 'function'){
    throw new PermissionNotFoundError()
  }

  permissions[user.role](user, builder)

  const ability = builder.build()

  return ability
}

