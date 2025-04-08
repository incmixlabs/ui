import { Button, Flex, Tabs } from "@incmix/ui"
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
const RolesPage = () => {
  const [expandedRows, setExpandedRows] = useState<ExpandedState>({})
  console.log(permissionsWithRoles)
  const columns = getColumns()
  const table = useReactTable<RoleWithPermissionsWithSubrows>({
    data: groupedPermissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      expanded: expandedRows,
    },
    onExpandedChange: setExpandedRows,
    getSubRows: (row) => row.subRows,
  })
  return (
    <DashboardLayout breadcrumbItems={[{ label: "Roles", url: "/roles" }]}>
      <Flex className="px-2 pt-4 pb-4 2xl:p-2" direction="column" gap="3">
        <Flex className="px-6" justify="between" gap="2" align="center">
          <Tabs.Root defaultValue="permissions">
            <Tabs.List>
              <Tabs.Trigger value="users">Users</Tabs.Trigger>
              <Tabs.Trigger value="permissions">Permissions</Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
          <Flex justify="end" gap="2" align="center">
            <Button variant="outline">
              <PlusCircleIcon /> Add New Role
            </Button>
            <Button variant="soft">Save Changes</Button>
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
