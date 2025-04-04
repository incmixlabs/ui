import { Button, Flex, Tabs, toast } from "@incmix/ui"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@incmix/ui/table"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import {
  type ExpandedState,
  flexRender,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { getCoreRowModel } from "@tanstack/react-table"
import { PlusCircleIcon, PlusIcon } from "lucide-react"
import React, { useState } from "react"
import { getColumns } from "./columns"
import { groupedPermissions, permissionsWithRoles } from "./mock"
import type { RoleWithPermissionsWithSubrows } from "./types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  type Change,
  getRolesPermissions,
  updateRolesPermissions,
} from "./actions"
const RolesPage = () => {
  const [expandedRows, setExpandedRows] = useState<ExpandedState>({})

  const { data } = useQuery({
    queryKey: ["roles-permissions"],
    queryFn: getRolesPermissions,
  })

  const [changes, setChanges] = useState<Change[]>([])

  const columns = getColumns(data?.roles ?? [])
  const table = useReactTable<RoleWithPermissionsWithSubrows>({
    data: data?.permissions ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      expanded: expandedRows,
    },
    onExpandedChange: setExpandedRows,
    getSubRows: (row) => row.subRows,
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateRolesPermissions,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["roles-permissions"] })
      toast.success("Roles permissions updated")
    },
    onError: () => {
      toast.error("Failed to update roles permissions")
    },
  })

  const handleSaveChanges = () => {
    mutation.mutate(changes)
  }

  return (
    <DashboardLayout breadcrumbItems={[{ label: "Roles", url: "/roles" }]}>
      <Flex className="px-2 pt-4 pb-4 2xl:p-2" direction="column" gap="3">
        <Flex className="px-6" justify="between" gap="2" align="center">
          {/* <Tabs.Root defaultValue="permissions">
            <Tabs.List>
              <Tabs.Trigger value="users">Users</Tabs.Trigger>
              <Tabs.Trigger value="permissions">Permissions</Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root> */}
          <Flex justify="end" gap="2" align="center">
            <Button variant="outline">
              <PlusCircleIcon /> Add New Role
            </Button>
            <Button variant="soft" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Flex>
        </Flex>
        <Table>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHead key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeadCell key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHeadCell>
              ))}
            </TableHead>
          ))}
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Flex>
    </DashboardLayout>
  )
}

export default RolesPage
