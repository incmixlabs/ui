import type { ColumnDef, Row } from "@tanstack/react-table"

import { Checkbox, DropdownMenu, Flex, Input, Text } from "@incmix/ui"
import { ChevronDown, ChevronRight, EllipsisVertical } from "lucide-react"
import { useContext, useMemo, useState } from "react"

import { permissionsContext } from "."
import type { ColumnAction, PermissionsWithRole, Role } from "./types"

export const getColumns = (
  roles: Role[],
  setColumnAction: React.Dispatch<React.SetStateAction<ColumnAction | null>>
): ColumnDef<PermissionsWithRole>[] => {
  const searchColumn: ColumnDef<PermissionsWithRole> = {
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

  const columns = roles.map<ColumnDef<PermissionsWithRole>>((role) => ({
    header: () => {
      return (
        <Flex direction="column" gap="1">
          <Flex justify="between" align="center" gap="2">
            <Text size="1" className="uppercase">
              Role
            </Text>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <EllipsisVertical className="size-4" />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  onClick={() =>
                    setColumnAction({
                      role,
                      type: "update",
                    })
                  }
                >
                  Edit
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() =>
                    setColumnAction({
                      role,
                      type: "delete",
                    })
                  }
                >
                  Delete
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
          <Text size="2" className="capitalize">
            {role.name}
          </Text>
        </Flex>
      )
    },
    accessorKey: role.name,
    cell: ({ row }) => {
      return <CheckboxCell row={row} role={role} />
    },
  }))

  return [searchColumn, ...columns]
}

const CheckboxCell = ({
  row,
  role,
}: {
  row: Row<PermissionsWithRole>
  role: Role
}) => {
  const { setChanges, setRawPermissions } = useContext(permissionsContext)
  const hasPermission = useMemo(() => {
    let hasPermission: boolean | "intermediate" =
      row.original[role.name] ?? false

    if (row.subRows.length > 0) {
      const isAllTrue = row.subRows.every(
        (subRow) => subRow.original[role.name]
      )
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

    return hasPermission
  }, [row, role])

  const [isChecked, setIsChecked] = useState(hasPermission)
  const handleChange = (v: boolean) => {
    setIsChecked(v)

    setRawPermissions((prev) => {
      return prev.map((permission) => {
        if (
          row.original.action === "manage" &&
          permission.subject === row.original.subject
        ) {
          return {
            ...permission,
            [role.name]: v,
          }
        }

        return permission.subject === row.original.subject &&
          permission.action === row.original.action
          ? { ...permission, [role.name]: v }
          : permission
      })
    })

    setChanges((prev) => {
      const existingChange = prev.find(
        (change) =>
          change.roleId === role.id &&
          change.action === row.original.action &&
          change.subject === row.original.subject
      )
      if (existingChange) {
        return prev.map((change) =>
          change.roleId === role.id &&
          change.action === row.original.action &&
          change.subject === row.original.subject
            ? { ...change, allowed: v }
            : change
        )
      }
      return [
        ...prev,
        {
          roleId: role.id,
          action: row.original.action,
          subject: row.original.subject,
          allowed: v,
        },
      ]
    })
  }
  return (
    <Checkbox checked={isChecked} onCheckedChange={(v) => handleChange(v)} />
  )
}
