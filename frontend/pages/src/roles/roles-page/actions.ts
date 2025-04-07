import { ORG_API_URL } from "@incmix/ui/constants"
import {
  type Action,
  type Subject,
  UserRoles,
  type subjects,
} from "@incmix/utils/types"
import type { PermissionsResponse, PermissionsWithRole, Role } from "./types"
export async function getRolesPermissions() {
  const res = await fetch(`${ORG_API_URL}/permissions/roles-permissions`, {
    credentials: "include",
  })
  const data = (await res.json()) as {
    roles: Role[]
    permissions: PermissionsResponse[]
  }

  return data
}

export function createPermissionSubrows(
  permissions: PermissionsResponse[]
): PermissionsWithRole[] {
  const transformedPermissions: PermissionsWithRole[] = []

  // Group permissions by subject
  const permissionsBySubject = permissions.reduce<
    Record<string, PermissionsResponse[]>
  >((acc, permission) => {
    if (!acc[permission.subject]) {
      acc[permission.subject] = []
    }
    acc[permission.subject].push(permission)
    return acc
  }, {})

  // Process each subject group
  Object.entries(permissionsBySubject).forEach(
    ([subject, subjectPermissions]) => {
      // Find manage permission for this subject
      const managePermission = subjectPermissions.find(
        (permission) => permission.action === "manage"
      )

      // Find CRUD permissions for this subject
      const crudPermissions = subjectPermissions.filter(
        (permission) =>
          permission.action === "create" ||
          permission.action === "read" ||
          permission.action === "update" ||
          permission.action === "delete"
      )

      if (managePermission) {
        // If manage permission exists, add it with CRUD as subRows
        transformedPermissions.push({
          ...managePermission,
          subRows: crudPermissions.map((permission) => ({
            ...permission,
            subRows: [],
          })),
        })
      } else if (crudPermissions.length > 0) {
        // If no manage permission but CRUD permissions exist
        // Create a virtual "manage" permission
        const virtualManage: PermissionsWithRole = {
          subject: subject as (typeof subjects)[number],
          action: "manage",
          [UserRoles.ROLE_ADMIN]: false,
          [UserRoles.ROLE_EDITOR]: false,
          [UserRoles.ROLE_VIEWER]: false,
          [UserRoles.ROLE_OWNER]: false,
          [UserRoles.ROLE_COMMENTER]: false,
          subRows: crudPermissions.map((permission) => ({
            ...permission,
            subRows: [],
          })),
        }
        transformedPermissions.push(virtualManage)
      }

      // Add other non-CRUD, non-manage permissions directly
      const otherPermissions = subjectPermissions.filter(
        (permission) =>
          permission.action !== "manage" &&
          permission.action !== "create" &&
          permission.action !== "read" &&
          permission.action !== "update" &&
          permission.action !== "delete"
      )

      otherPermissions.forEach((permission) => {
        transformedPermissions.push({
          ...permission,
          subRows: [],
        })
      })
    }
  )

  return transformedPermissions
}

export type Change = {
  roleId: number
  action: Action
  subject: Subject
  allowed: boolean
}

export async function updateRolesPermissions(changes: Change[]) {
  const res = await fetch(`${ORG_API_URL}/permissions/roles-permissions`, {
    method: "PUT",
    body: JSON.stringify({ updates: changes }),
    headers: { "content-type": "application/json" },
    credentials: "include",
  })

  if (!res.ok) {
    throw new Error("Failed to update roles permissions")
  }

  const data = await res.json()
  return data
}
