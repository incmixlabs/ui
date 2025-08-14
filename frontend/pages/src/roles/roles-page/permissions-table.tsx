import { Button, Flex, toast } from "@incmix/ui/base"
import { DataTable } from "@incmix/ui/tanstack-table"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback, useContext, useMemo, useState } from "react"
import { permissionsContext } from "."
import { flattenPermissions } from "../../../../ui/src/components/tanstack-table/utils/column-utils"
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

    return flattenPermissions(transformedPermissions)
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
                const change = {
                  resource: permission.resource,
                  subject: permission.subject,
                  action: permission.action,
                  role: role.name,
                  granted: e.target.checked,
                }
                setChanges((prevChanges) => {
                  const filtered = prevChanges.filter(
                    (c) =>
                      !(
                        c.subject === change.subject &&
                        c.action === change.action &&
                        c.role === change.role
                      )
                  )
                  return [...filtered, change]
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

  return (
    <Flex className="px-2 pt-4 pb-4 2xl:p-2" direction="column" gap="3">
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

      <DataTable
        columns={columns}
        data={tableData}
        enableFiltering={true}
        enableSorting={false}
        isRoles={true}
        enablePagination={false}
        enableRowSelection={false}
        enableColumnVisibility={false}
        filterColumn="resource" // Update filter to use merged resource field
        filterPlaceholder="Search Permissions"
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
