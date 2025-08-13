import { Button, Flex, toast } from "@incmix/ui/base"
import { DataTable } from "@incmix/ui/tanstack-table"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback, useContext, useMemo, useState } from "react"
import { permissionsContext } from "."
import { createPermissionSubrows, updateRolesPermissions } from "./actions"
import { DeleteDialog } from "./delete-dialog"
import RoleEditorModal from "./role-editor-modal"
import type { ColumnAction, PermissionsWithRole } from "./types"

const PermissionsTable = () => {
  const [columnAction, setColumnAction] = useState<ColumnAction | null>(null)

  const { changes, setChanges, rawPermissions, roles } =
    useContext(permissionsContext)

  const permissions = useMemo(() => {
    const transformedPermissions = createPermissionSubrows(
      rawPermissions,
      roles
    )

    const flattenedPermissions: any[] = []

    const flattenPermission = (permission: any) => {
      const { subRows, subject, action, ...rest } = permission
      const mergedPermission = {
        ...rest,
        resource: `${action} ${subject.toLowerCase()}`,
        subject,
        action,
      }
      flattenedPermissions.push(mergedPermission)

      if (subRows && subRows.length > 0) {
        subRows.forEach((subRow: any) => {
          flattenPermission(subRow)
        })
      }
    }

    transformedPermissions.forEach(flattenPermission)
    return flattenedPermissions
  }, [rawPermissions, roles])

  const columns = useMemo(() => {
    const dataTableColumns = [
      {
        headingName: "Resource",
        accessorKey: "resource",
        type: "text",
      },
      // Add columns for each role
      ...roles.map((role) => ({
        headingName: role.name,
        accessorKey: role.name.toLowerCase(),
        type: "boolean",
        cell: ({ row }: any) => {
          const permission = row.original
          const hasPermission = permission[role.name.toLowerCase()]
          return (
            <input
              type="checkbox"
              className="mx-auto w-4"
              checked={hasPermission}
              onChange={(e) => {
                console.log("Permission changed:", {
                  resource: permission.resource,
                  subject: permission.subject,
                  action: permission.action,
                  role: role.name,
                  granted: e.target.checked,
                })
              }}
            />
          )
        },
      })),
    ]

    return dataTableColumns
  }, [roles])

  const tableData = useMemo(() => {
    return permissions
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
  const handleSelectionChange = useCallback(
    (selectedRows: Record<string, boolean>) => {
      console.log("Selected rows:", selectedRows)
    },
    []
  )

  console.log("tableData", tableData)

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

      {/* DataTable component - removed expandable rows configuration */}
      <DataTable
        columns={columns}
        data={tableData}
        enableFiltering={true}
        enableSorting={false}
        enablePagination={false}
        enableRowSelection={false}
        enableColumnVisibility={false}
        filterColumn="resource" // Update filter to use merged resource field
        filterPlaceholder="Search Permissions"
        onSelectionChange={handleSelectionChange}
        className="w-full"
        showRowCount={false}
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
