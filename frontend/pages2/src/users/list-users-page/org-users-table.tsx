"use client"

import {
  DataTable,
  type DataTableFilterField,
  DataTableToolbar,
  useDataTable,
} from "@incmix/ui2"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { ToolbarActions } from "./org-toolbar-actions"

import { I18n } from "@incmix/pages/i18n"
import { useOrganizationStore } from "@incmix/store"
import { ORG_API_URL } from "@incmix/ui/constants"
import { Spinner } from "@incmix/ui2"
import type { MemberDetails } from "@incmix/utils/types"
import { getColumns } from "./org-user-columns"

const AdminUsersTable = () => {
  const columns = React.useMemo(() => getColumns(), [])

  const filterFields: DataTableFilterField<MemberDetails>[] = [
    {
      id: "fullName",
      label: "Full Name",
      placeholder: "Filter Full Name...",
    },
  ]

  // const { page, pageSize, name, sort } =
  //   ListUsersRoute.useSearch() as UserListSearchParams
  const { selectedOrganisation } = useOrganizationStore()

  const { data, isFetching, isLoading } = useQuery<MemberDetails[]>({
    queryKey: ["organizationMembers", selectedOrganisation?.id, I18n.language],
    queryFn: async () => {
      if (!selectedOrganisation?.id)
        throw new Error(I18n.t("error.organizationIdRequired"))
      const res = await fetch(
        `${ORG_API_URL}/${selectedOrganisation?.id}/members`,
        {
          credentials: "include",
          headers: {
            "Accept-Language": I18n.language ?? "en",
          },
        }
      )
      if (!res.ok) throw new Error(I18n.t("error.fetchOrganizationMembers"))
      return res.json()
    },
    enabled: !!selectedOrganisation?.id,
    retry: false,
  })

  const { table } = useDataTable({
    data: data ?? [],
    columns,
    pageCount: 1,
    filterFields,
    enableAdvancedFilter: false,
    initialState: {
      sorting: [{ id: "userId", desc: false }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.userId,
    shallow: false,
    clearOnDefault: true,
  })

  if (isLoading && !data) return <Spinner />
  return (
    <div>
      <DataTable table={table}>
        <DataTableToolbar table={table} filterFields={filterFields}>
          {isFetching && <Spinner className="mr-auto" />}
          <ToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
    </div>
  )
}

export default AdminUsersTable
