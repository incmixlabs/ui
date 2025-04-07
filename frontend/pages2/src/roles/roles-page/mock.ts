import type {
  Permission,
  PermissionWithSubrows,
  Role,
  RolePermission,
  RoleWithPermissions,
  RoleWithPermissionsWithSubrows,
} from "./types"

export const roles: Role[] = [
  {
    id: "1",
    name: "Admin",
  },
  {
    id: "2",
    name: "Editor",
  },
  {
    id: "3",
    name: "Viewer",
  },
  {
    id: "4",
    name: "Commenter",
  },
]

export const permissions: Permission[] = [
  {
    id: "1",
    name: "Read",
    subject: "Users",
  },
  {
    id: "2",
    name: "Create",
    subject: "Users",
  },
  {
    id: "3",
    name: "Update",
    subject: "Users",
  },
  {
    id: "4",
    name: "Delete",
    subject: "Users",
  },
  {
    id: "5",
    name: "Read",
    subject: "Projects",
  },
  {
    id: "6",
    name: "Create",
    subject: "Projects",
  },
  {
    id: "7",
    name: "Update",
    subject: "Projects",
  },
  {
    id: "8",
    name: "Delete",
    subject: "Projects",
  },
]

export const rolePermissions: RolePermission[] = [
  {
    roleId: "1",
    permissionId: "1",
  },
  {
    roleId: "1",
    permissionId: "2",
  },
  {
    roleId: "1",
    permissionId: "3",
  },
  {
    roleId: "1",
    permissionId: "4",
  },
  {
    roleId: "1",
    permissionId: "5",
  },
  {
    roleId: "1",
    permissionId: "6",
  },
  {
    roleId: "1",
    permissionId: "7",
  },
]

export const permissionsWithRoles: RoleWithPermissions[] = permissions.map(
  (permission) => {
    return {
      ...permission,
      ...Object.fromEntries(
        rolePermissions.map((rp) => {
          const role = roles.find((r) => r.id === rp.roleId)
          const hasPermission = rolePermissions.some(
            (rp) => rp.permissionId === permission.id
          )
          return [role?.name, hasPermission]
        })
      ),
    }
  }
)

export const groupPermissionsBySubject =
  (): RoleWithPermissionsWithSubrows[] => {
    // Group permissions by subject
    const groupedBySubject = permissionsWithRoles.reduce<
      Record<string, RoleWithPermissions[]>
    >((acc, permission) => {
      const { subject } = permission
      if (!acc[subject]) {
        acc[subject] = []
      }
      acc[subject].push(permission)
      return acc
    }, {})

    // Convert the grouped permissions into the required format
    return Object.entries(groupedBySubject).map(([subject, permissions]) => {
      // Create a parent row for each subject
      // @ts-expect-error
      const parentRow: RoleWithPermissionsWithSubrows = {
        id: `subject-${subject}`,
        name: `Manage ${subject}`,
        subject: subject,
        // Copy the permission values from the first permission in the group
        ...Object.fromEntries(roles.map((role) => [role.name, false])),
        // Add subRows with the actual permissions
        subRows: permissions,
      }

      // Update parent row permissions based on children
      roles.forEach((role) => {
        // If all permissions in this subject have this role, set parent to true
        parentRow[role.name] = permissions.every((p) => p[role.name])
      })

      return parentRow
    })
  }

export const groupedPermissions = groupPermissionsBySubject()
console.log(groupedPermissions)
