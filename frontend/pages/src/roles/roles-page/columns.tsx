import type { ColumnDef } from "@tanstack/react-table"

import { Checkbox, Flex, Input, Text } from "@incmix/ui"
import { EllipsisVertical } from "lucide-react"
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
        <div className="font-medium capitalize">
          {`${row.getValue("name")} (${row.original.subject})`}
        </div>
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
