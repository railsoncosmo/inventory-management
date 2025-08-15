import { defineAbilityFor } from '@/infrastructure/rbac/index'
import { userSchema } from '@/infrastructure/rbac/models/user'
import { Role } from '@/infrastructure/rbac/roles'


export function getUserPermission(userId: string, role: Role){
  const authUser = userSchema.parse({
    id: userId,
    role,
  })

  const ability = defineAbilityFor(authUser)

  return ability
}