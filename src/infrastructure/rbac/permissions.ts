import { AbilityBuilder } from '@casl/ability'
import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from '@/infrastructure/rbac/roles'


type PermissionsByRole = (user: User, builder: AbilityBuilder<AppAbility>) => void;

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: (_user, { can }) => {
    can('manage', 'all')
  },
  USER: (_user, { can, cannot }) => {
    can('update', 'User')
    can(['create', 'read'], 'Product')
    cannot('create', 'Category')
    can('read', 'Category')
    can('read', 'Inventory')
    can(['create', 'read'], 'Transaction')
  },
}