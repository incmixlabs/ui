import { Flex, Spinner } from "@incmix/ui"
import { INTL_API_URL } from "@incmix/ui/constants"
import {
  DataTable,
  type DataTableAdvancedFilterField,
  DataTableAdvancedToolbar,
  type DataTableRowAction,
  useDataTable,
} from "@incmix/ui/data-table"
import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"
import { TranslationsRoute } from "translations/routes"
import type { TranslationSearchParams } from "../routes/translations"
import { DeleteDialog } from "./delete-dialog"
import { EditTranslationDialog } from "./edit-translation"
import { ToolbarActions } from "./toolbar-actions"
import { getColumns } from "./translations-columns"
import type { TranslationMessage } from "./types"

export const TranslationsTable = () => {
  const [rowAction, setRowAction] =
    useState<DataTableRowAction<TranslationMessage> | null>(null)
  const columns = React.useMemo(() => getColumns({ setRowAction }), [])

  const advancedFilter: DataTableAdvancedFilterField<TranslationMessage>[] = [
    {
      id: "locale",
      label: "Locale",
      type: "text",
    },
    {
      id: "namespace",
      label: "Namespace",
      type: "text",
    },
    {
      id: "key",
      label: "Key",
      type: "text",
    },
    {
      id: "value",
      label: "Value",
      type: "text",
    },
    {
      id: "type",
      label: "Type",
      type: "multi-select",
      options: [
        { label: "Frag", value: "frag" },
        { label: "Label", value: "label" },
      ],
    },
  ]

  const { page, pageSize, filters, sort, joinOperator } =
    TranslationsRoute.useSearch() as TranslationSearchParams

  const { data, isLoading, refetch } = useQuery<{
    results: TranslationMessage[]
    metadata: { pageCount: number }
  }>({
    queryKey: [
      "translations-list",
      filters,
      joinOperator,
      sort,
      page,
      pageSize,
    ],
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
        `${INTL_API_URL}/messages?${searchParams.toString()}`,
        {
          method: "GET",
          credentials: "include",
        }
      )

      return await res.json()
    },
  })

  const { table } = useDataTable({
    data: data?.results ?? [],
    columns,
    pageCount: data?.metadata.pageCount ?? 1,
    filterFields: advancedFilter,

    enableAdvancedFilter: true,
    enableMultiSort: true,
    initialState: {
      sorting: [{ id: "id", desc: false }],
      columnPinning: { right: ["actions"] },
      columnVisibility: { id: false },
    },
    getRowId: (originalRow) => String(originalRow.id),
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
          {isLoading && <Spinner className="mr-auto" />}
          <ToolbarActions table={table} refetchData={refetch} />
        </DataTableAdvancedToolbar>
      </DataTable>
      <DeleteDialog
        open={rowAction?.type === "delete"}
        onOpenChange={() => setRowAction(null)}
        items={rowAction?.row.original ? [rowAction?.row.original] : []}
        showTrigger={false}
        onSuccess={() => {
          rowAction?.row.toggleSelected(false)
          setRowAction(null)
          refetch()
        }}
      />
      <EditTranslationDialog
        open={rowAction?.type === "update"}
        onOpenChange={() => setRowAction(null)}
        item={rowAction?.row.original}
        onSuccess={() => {
          rowAction?.row.toggleSelected(false)
          setRowAction(null)
          refetch()
        }}
      />
    </div>
  )
}
