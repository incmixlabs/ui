import type { Action, subjects } from "@incmix/utils/types"

export type Role = {
  id: number
  name: string
  isSystemRole?: boolean
}

export type PermissionsResponse = {
  subject: (typeof subjects)[number]
  action: Action
  [key: string]: any
}

export type PermissionsWithRole = PermissionsResponse & {
  subRows: PermissionsWithRole[]
}

export type ColumnAction = {
  role: Role
  type: "update" | "delete"
}
