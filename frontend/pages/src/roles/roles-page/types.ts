import { type Action, UserRoles, type subjects } from "@incmix/utils/types"

export type Role = {
  id: number
  name:
    | UserRoles.ROLE_ADMIN
    | UserRoles.ROLE_EDITOR
    | UserRoles.ROLE_VIEWER
    | UserRoles.ROLE_OWNER
    | UserRoles.ROLE_COMMENTER
}

export type PermissionsResponse = {
  subject: (typeof subjects)[number]
  action: Action
  [UserRoles.ROLE_ADMIN]: boolean
  [UserRoles.ROLE_EDITOR]: boolean
  [UserRoles.ROLE_VIEWER]: boolean
  [UserRoles.ROLE_OWNER]: boolean
  [UserRoles.ROLE_COMMENTER]: boolean
}

export type PermissionsWithRole = PermissionsResponse & {
  subRows: PermissionsWithRole[]
}

export type ColumnAction = {
  role: Role
  type: "update" | "delete"
}
