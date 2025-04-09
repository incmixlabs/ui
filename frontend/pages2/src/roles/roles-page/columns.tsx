import type { ColumnDef } from "@tanstack/react-table"

import { Checkbox, Flex, Input, Text } from "@incmix/ui2"
import { ChevronDown, ChevronRight, EllipsisVertical } from "lucide-react"
import { useState } from "react"
import { roles } from "./mock"
import type { RoleWithPermissions } from "./types"

export const getColumns = (): ColumnDef<RoleWithPermissions>[] => {
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
            {`${row.getValue("name")} (${row.original.subject})`}
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
      const hasPermission = row.original[role.name] ?? false
      const [isChecked, setIsChecked] = useState(hasPermission)
      return (
        <Checkbox
          checked={isChecked}
          onCheckedChange={(v) => setIsChecked(Boolean(v))}
        />
      )
    },
  }))

  return [searchColumn, ...columns]
}
