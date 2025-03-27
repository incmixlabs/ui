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
import { flexRender, useReactTable } from "@tanstack/react-table"
import { getCoreRowModel } from "@tanstack/react-table"
import { PlusCircleIcon, PlusIcon } from "lucide-react"
import React from "react"
import { getColumns } from "./columns"
import { permissionsWithRoles } from "./mock"
import type { RoleWithPermissions } from "./types"
const RolesPage = () => {
  console.log(permissionsWithRoles)
  const columns = getColumns()
  const table = useReactTable<RoleWithPermissions>({
    data: permissionsWithRoles,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
