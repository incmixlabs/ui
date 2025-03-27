export type Role = {
  id: string
  name: string
}

export type Permission = {
  id: string
  name: string
  subject: string
}

export type RolePermission = {
  roleId: string
  permissionId: string
}

export type RoleWithPermissions = Permission & {
  [key: string]: boolean
}
