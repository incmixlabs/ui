import type { ColumnDef, Row } from "@tanstack/react-table"

import { Checkbox, Flex, Input, Text } from "@incmix/ui"
import { ChevronDown, ChevronRight, EllipsisVertical } from "lucide-react"
import { useState } from "react"

import type { Role, RoleWithPermissions } from "./types"
import type { Change } from "./actions"

export const getColumns = (
  roles: Role[],
  setChanges: React.Dispatch<React.SetStateAction<Change[]>>
): ColumnDef<RoleWithPermissions>[] => {
  const searchColumn: ColumnDef<RoleWithPermissions> = {
    header: () => {
      return <Input placeholder="Search Permissions" />
    },
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <Flex style={{ paddingLeft: `${row.depth * 2}rem` }}>
          {row.getCanExpand() && (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" },
              }}
            >
              {row.getIsExpanded() ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </button>
          )}
          <div className="font-medium capitalize">
            {`${row.original.action} ${row.original.subject}`}
          </div>
        </Flex>
      )
    },
  }

  const columns = roles.map<ColumnDef<RoleWithPermissions>>((role) => ({
    header: () => {
      return (
        <Flex direction="column" gap="1">
          <Flex justify="between" align="center" gap="2">
            <Text size="1" className="uppercase">
              Role
            </Text>
            <EllipsisVertical className="size-4" />
          </Flex>
          <Text size="2" className="capitalize">
            {role.name}
          </Text>
        </Flex>
      )
    },
    accessorKey: role.name,
    cell: ({ row }) => {
      return <CheckboxCell row={row} role={role} setChanges={setChanges} />
    },
  }))

  return [searchColumn, ...columns]
}

const CheckboxCell = ({
  row,
  role,
  setChanges,
}: {
  row: Row<RoleWithPermissions>
  role: Role
  setChanges: React.Dispatch<React.SetStateAction<Change[]>>
}) => {
  let hasPermission: boolean | "intermediate" = row.original[role.name] ?? false

  if (row.subRows.length > 0) {
    const isAllTrue = row.subRows.every((subRow) => subRow.original[role.name])
    const isAllFalse = row.subRows.every(
      (subRow) => !subRow.original[role.name]
    )
    if (isAllTrue) {
      hasPermission = true
    } else if (isAllFalse) {
      hasPermission = false
    } else {
      hasPermission = "intermediate"
    }
  }

  const [isChecked, setIsChecked] = useState(hasPermission)
  const handleChange = (v: boolean) => {
    setIsChecked(v)
    setChanges((prev) => [
      ...prev,
      {
        roleId: role.id,
        action: row.original.action,
        subject: row.original.subject,
        enabled: v,
      },
    ])
  }
  return (
    <Checkbox
      checked={isChecked}
      onCheckedChange={(v) => handleChange(Boolean(v))}
    />
  )
}
