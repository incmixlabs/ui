"use client"
import React from "react"

import {
  DataTable,
  type DataTableAdvancedFilterField,
  DataTableAdvancedToolbar,
  type DataTableFilterField,
  type DataTableRowAction,
  Flex,
  useDataTable,
} from "@incmix/ui2"
import { useQuery } from "@tanstack/react-query"

import { USERS_API_URL } from "@incmix/ui/constants"
import { Spinner } from "@incmix/ui2"
import type { UserAndProfile, UserProfilePaginated } from "@incmix/utils/types"
import { ListUsersRoute } from "@users/routes"
import type { UserListSearchParams } from "@users/routes/list-users"
import { getColumns } from "./admin-user-columns"
import { DeleteDialog } from "./delete-dialog"
import { PasswordDialog } from "./password-dialog"
import { ToolbarActions } from "./toolbar-actions"

const AdminUsersTable = () => {
  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<UserAndProfile> | null>(null)

  const columns = React.useMemo(() => getColumns({ setRowAction }), [])

  const filterFields: DataTableFilterField<UserAndProfile>[] = [
    {
      id: "fullName",
      label: "Full Name",
      placeholder: "Filter Full Name...",
    },
  ]

  const advancedFilter: DataTableAdvancedFilterField<UserAndProfile>[] = [
    {
      id: "fullName",
      label: "Full Name",
      type: "text",
    },
    {
      id: "email",
      label: "Email",
      type: "text",
    },
  ]

  const { page, pageSize, filters, sort, joinOperator } =
    ListUsersRoute.useSearch() as UserListSearchParams

  const { data, isLoading, isFetching } = useQuery<UserProfilePaginated>({
    queryKey: ["user-list", filters, joinOperator, sort, page, pageSize],
    placeholderData: (prev) => prev,
    queryFn: async () => {
      const searchParams = new URLSearchParams()
      if (pageSize) searchParams.append("pageSize", String(pageSize))
      if (page) searchParams.append("page", String(page))
      if (filters?.length)
        searchParams.append("filters", JSON.stringify(filters))
      if (joinOperator) searchParams.append("joinOperator", joinOperator)
      if (sort?.length) {
        searchParams.append("sort", JSON.stringify(sort))
      }

      const res = await fetch(
        `${USERS_API_URL}/list?${searchParams.toString()}`,
        {
          credentials: "include",
        }
      )
      return await res.json()
    },
  })

  const { table } = useDataTable({
    data: data?.results ?? [],
    columns,
    pageCount: data?.metadata?.pageCount ?? 1,
    filterFields,
    enableAdvancedFilter: false,
    initialState: {
      sorting: [{ id: "id", desc: false }],
      columnPinning: { right: ["actions"] },
      columnVisibility: { id: false },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
  })

  if (isLoading && !data)
    return (
      <Flex
        className="h-[calc((100vh-var(--navbar-height))-3rem)]"
        align="center"
        justify="center"
      >
        <Spinner className="size-10" />
      </Flex>
    )
  return (
    <div>
      <DataTable table={table}>
        <DataTableAdvancedToolbar table={table} filterFields={advancedFilter}>
          {isFetching && <Spinner className="mr-auto" />}
          <ToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      </DataTable>
      <DeleteDialog
        open={rowAction?.type === "delete"}
        onOpenChange={() => setRowAction(null)}
        items={rowAction?.row.original ? [rowAction?.row.original] : []}
        showTrigger={false}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
      <PasswordDialog
        open={rowAction?.type === "changePassword"}
        onOpenChange={() => setRowAction(null)}
        items={rowAction?.row.original ? [rowAction?.row.original] : []}
        onSuccess={() => {
          rowAction?.row.toggleSelected(false)
          setRowAction(null)
        }}
      />
    </div>
  )
}

export default AdminUsersTable
export { AdminUsersTable }
