import {
  type ExpandedState,
  flexRender,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import { getCoreRowModel } from "@tanstack/react-table"
import { PlusCircleIcon } from "lucide-react"
import { Button, Flex, Tabs,
  Table, } from "@incmix/ui"
import { DashboardLayout } from "../../common/components/layouts/admin-panel/layout"

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
        <Table.Root>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Header key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.ColumnHeaderCell key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Header>
          ))}
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Flex>
    </DashboardLayout>
  )
}

export default RolesPage
