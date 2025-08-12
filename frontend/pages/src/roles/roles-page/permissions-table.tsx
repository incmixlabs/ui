import { Button, Flex, toast } from "@incmix/ui/base"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback, useContext, useMemo, useState } from "react"
import { DataTable } from "@incmix/ui/tanstack-table"
import { permissionsContext } from "."
import { createPermissionSubrows, updateRolesPermissions } from "./actions"
import { getColumns } from "./columns"
import { DeleteDialog } from "./delete-dialog"
import RoleEditorModal from "./role-editor-modal"
import type { ColumnAction, PermissionsWithRole } from "./types"

const PermissionsTable = () => {
  const [columnAction, setColumnAction] = useState<ColumnAction | null>(null)

  const { changes, setChanges, rawPermissions, roles } =
    useContext(permissionsContext)

  // Transform permissions data with memoization
  const permissions = useMemo(() => {
    const transformedPermissions = createPermissionSubrows(
      rawPermissions,
      roles
    )
    return transformedPermissions
  }, [rawPermissions, roles])

  // Create DataTable-specific columns
  const columns = useMemo(() => {
    const dataTableColumns = [
      {
        headingName: 'Resource',
        accessorKey: 'subject',
        type: 'text',
      },
      {
        headingName: 'Action',
        accessorKey: 'action',
        type: 'text',
      },
      // Add columns for each role
      ...roles.map(role => ({
        headingName: role.name,
        accessorKey: role.name.toLowerCase(),
        type: 'boolean',
        cell: ({ row }: any) => {
          const permission = row.original;
          const hasPermission = permission[role.name.toLowerCase()];
          return (
            <input
              type="checkbox"
              checked={hasPermission}
              onChange={(e) => {
                // Handle permission change
                console.log('Permission changed:', {
                  subject: permission.subject,
                  action: permission.action,
                  role: role.name,
                  granted: e.target.checked
                });
              }}
            />
          );
        }
      }))
    ];

    return dataTableColumns;
  }, [roles])

  // Transform the permissions data to work with DataTable's expectations
  const tableData = useMemo(() => {
    // Extract just the original data from each permission row
    return permissions.map(permission => permission.original || permission)
  }, [permissions])

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

  const handleSaveChanges = useCallback(() => {
    mutation.mutate(changes)
  }, [mutation, changes])

  // Handle row selection changes if needed
  const handleSelectionChange = useCallback((selectedRows: Record<string, boolean>) => {
    // Handle selection changes if your permissions table needs it
    console.log('Selected rows:', selectedRows)
  }, [])

  return (
    <Flex className="px-2 pt-4 pb-4 2xl:p-2" direction="column" gap="3">
      {/* Header with actions */}
      <Flex className="px-6" justify="between" gap="2" align="center">
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

      {/* DataTable component */}
      <DataTable
        columns={columns}
        data={tableData}
        enableFiltering={true}
        enableSorting={false}
        enablePagination={false}
        enableRowSelection={false}
        enableColumnVisibility={false}
        filterColumn="subject" // Use subject field for filtering permissions
        filterPlaceholder="Search Permissions"
        // Expandable rows configuration for hierarchical permissions
        expandableRows={{
          enabled: true,
          singleExpand: false, // Allow multiple rows to be expanded
          getSubRows: (row: PermissionsWithRole) => row.subRows || [],
        }}
        onRowSelectionChange={handleSelectionChange}
        className="w-full"
        showRowCount={false}
        // Disable features not needed for permissions
        enableColumnResizing={false}
        enableColumnReordering={false}
      />

      {/* Modals */}
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
    </Flex>
  )
}

export default PermissionsTable