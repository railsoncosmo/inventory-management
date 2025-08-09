import { defineAbilityFor } from '@/auth/rbac/index'
import { userSchema } from '@/auth/rbac/models/user'
import { Role } from '@/auth/rbac/roles'


export function getUserPermission(userId: string, role: Role){
  const authUser = userSchema.parse({
    id: userId,
    role,
  })

  const ability = defineAbilityFor(authUser)

  return ability
}