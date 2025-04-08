import { Button, Flex, toast } from "@incmix/ui"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@incmix/ui/table"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  type ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useContext, useMemo, useState } from "react"
import { permissionsContext } from "."
import { createPermissionSubrows, updateRolesPermissions } from "./actions"
import { getColumns } from "./columns"
import RoleEditorModal from "./role-editor-modal"
import type { ColumnAction, PermissionsWithRole } from "./types"
import { DeleteDialog } from "./delete-dialog"

const PermissonsTable = () => {
  const [columnAction, setColumnAction] = useState<ColumnAction | null>(null)

  const [expandedRows, setExpandedRows] = useState<ExpandedState>({})

  const { changes, rawPermissions, roles } = useContext(permissionsContext)

  const permissions = useMemo(() => {
    const transformedPermissions = createPermissionSubrows(rawPermissions)
    return transformedPermissions
  }, [rawPermissions])

  const columns = getColumns(roles, setColumnAction)
  const table = useReactTable<PermissionsWithRole>({
    data: permissions,
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
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSaveChanges = () => {
    mutation.mutate(changes)
  }

  return (
    <Flex className="px-2 pt-4 pb-4 2xl:p-2" direction="column" gap="3">
      <Flex className="px-6" justify="between" gap="2" align="center">
        {/* <Tabs.Root defaultValue="permissions">
            <Tabs.List>
              <Tabs.Trigger value="users">Users</Tabs.Trigger>
              <Tabs.Trigger value="permissions">Permissions</Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root> */}
        <Flex justify="end" gap="2" align="center">
          <RoleEditorModal
            title="Add New Role"
            showTrigger
            onSuccess={() => {
              queryClient.invalidateQueries({
                queryKey: ["roles-permissions"],
              })
            }}
          />
          <Button
            variant="soft"
            onClick={handleSaveChanges}
            disabled={mutation.isPending || changes.length < 1}
          >
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
      <RoleEditorModal
        title="Edit Role"
        role={columnAction?.role}
        open={columnAction?.type === "update"}
        onOpenChange={() => setColumnAction(null)}
        onSuccess={async () => {
          setColumnAction(null)
          await queryClient.invalidateQueries({
            queryKey: ["roles-permissions"],
          })
        }}
      />
      <DeleteDialog
        item={columnAction.role}
        onSuccess={async () => {
          setColumnAction(null)
          await queryClient.invalidateQueries({
            queryKey: ["roles-permissions"],
          })
        }}
      />
    </Flex>
  )
}

export default PermissonsTable
