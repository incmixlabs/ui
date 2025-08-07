import { PERMISSIONS_API_URL } from "@incmix/ui/constants"
import type { Action, Subject, subjects } from "@incmix/utils/types"
import type { PermissionsResponse, PermissionsWithRole, Role } from "./types"
export async function getRolesPermissions(
  orgId?: string,
  isSuperAdmin?: boolean
) {
  const searchParams = new URLSearchParams()
  if (orgId && !isSuperAdmin) searchParams.set("orgId", orgId)

  const queryString = searchParams.toString()
  const url = queryString
    ? `${PERMISSIONS_API_URL}?${queryString}`
    : PERMISSIONS_API_URL

  const res = await fetch(url, {
    credentials: "include",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch roles and permissions")
  }

  const data = (await res.json()) as {
    roles: Role[]
    permissions: PermissionsResponse[]
  }

  return data
}

export function createPermissionSubrows(
  permissions: PermissionsResponse[],
  roles: Role[]
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
          ...Object.fromEntries(roles.map((r) => [r.name, false])),
          subRows: crudPermissions.map<PermissionsWithRole>((permission) => ({
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
  const res = await fetch(`${PERMISSIONS_API_URL}`, {
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

export async function createRole(role: string) {
  const res = await fetch(`${PERMISSIONS_API_URL}/roles`, {
    method: "POST",
    body: JSON.stringify({ name: role }),
    headers: { "content-type": "application/json" },
    credentials: "include",
  })

  if (!res.ok) {
    throw new Error("Failed to create role")
  }

  const data = (await res.json()) as {
    message: string
  }
  return data
}

export async function deleteRole(roleId: number) {
  const res = await fetch(`${PERMISSIONS_API_URL}/roles/${roleId}`, {
    method: "DELETE",
    credentials: "include",
  })

  if (!res.ok) {
    throw new Error("Failed to delete role")
  }

  const data = (await res.json()) as {
    message: string
  }
  return data
}

export async function updateRole(role: { id: number; name: string }) {
  const res = await fetch(`${PERMISSIONS_API_URL}/roles`, {
    method: "PUT",
    body: JSON.stringify(role),
    headers: { "content-type": "application/json" },
    credentials: "include",
  })

  if (!res.ok) {
    throw new Error("Failed to update role")
  }

  const data = (await res.json()) as {
    message: string
  }
  return data
}
