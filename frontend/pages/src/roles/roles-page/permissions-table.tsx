import {
  Button,
  Flex,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  toast,
} from "@incmix/ui"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  type Column,
  type ColumnFiltersState,
  type ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { permissionsContext } from "."
import { createPermissionSubrows, updateRolesPermissions } from "./actions"
import { getColumns } from "./columns"
import { DeleteDialog } from "./delete-dialog"
import RoleEditorModal from "./role-editor-modal"
import type { ColumnAction, PermissionsWithRole } from "./types"

const PermissonsTable = () => {
  const [columnAction, setColumnAction] = useState<ColumnAction | null>(null)

  const [expandedRows, setExpandedRows] = useState<ExpandedState>({})

  const { changes, setChanges, rawPermissions, roles } =
    useContext(permissionsContext)

  const permissions = useMemo(() => {
    const transformedPermissions = createPermissionSubrows(
      rawPermissions,
      roles
    )

    return transformedPermissions
  }, [rawPermissions, roles])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns = getColumns(roles, setColumnAction)
  const table = useReactTable<PermissionsWithRole>({
    data: permissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      expanded: expandedRows,
      columnFilters,
    },
    filterFromLeafRows: false,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpandedRows,
    getSubRows: (row) => row.subRows,
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateRolesPermissions,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["roles-permissions"] })
      toast.success("Roles permissions updated")
      setChanges([])
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
                {header.column.getCanFilter() ? (
                  <div>
                    <Filter column={header.column} />
                  </div>
                ) : null}
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
      {
        <DeleteDialog
          items={columnAction?.role ? [columnAction.role] : []}
          open={columnAction?.type === "delete"}
          onOpenChange={() => setColumnAction(null)}
          onSuccess={async () => {
            setColumnAction(null)
            await queryClient.invalidateQueries({
              queryKey: ["roles-permissions"],
            })
          }}
        />
      }
    </Flex>
  )
}

function Filter({ column }: { column: Column<PermissionsWithRole, unknown> }) {
  const columnFilterValue = column.getFilterValue()
  const [value, setValue] = useState<string>(
    (columnFilterValue as string) || ""
  )

  // Use useRef to store the timeout ID to prevent it from causing re-renders
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Update local state when column filter value changes
  useEffect(() => {
    if (columnFilterValue !== value) {
      setValue((columnFilterValue as string) || "")
    }
  }, [columnFilterValue])

  // Clear the previous timeout and set a new one when value changes
  const debouncedSetFilter = useCallback(
    (newValue: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        column.setFilterValue(newValue)
      }, 300)
    },
    [column]
  )

  // Only update the filter when value changes from user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    debouncedSetFilter(newValue)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <Input
      placeholder="Search Permissions"
      value={value}
      onChange={handleInputChange}
    />
  )
}
export default PermissonsTable
