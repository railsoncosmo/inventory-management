import { defineAbilityFor } from '../rbac'
import { userSchema } from '../rbac/models/user'
import { Role } from '../rbac/roles'

export function getUserPermission(userId: string, role: Role){
  const authUser = userSchema.parse({
    id: userId,
    role,
  })

  const ability = defineAbilityFor(authUser)

  return ability
}