import { AbilityBuilder } from '@casl/ability'
import { User } from './models/user'
import { AppAbility } from '.'
import { Role } from './roles'

type PermissionsByRole = (user: User, builder: AbilityBuilder<AppAbility>) => void;

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: (_user, { can }) => {
    can('manage', 'all')
  },
  USER: (_user, { can, cannot }) => {
    can(['create', 'read'], 'Product')
    cannot('create', 'Category')
    can('read', 'Category')
    can('read', 'Inventory')
    can(['create', 'read'], 'Transaction')
  },
}