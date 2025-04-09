"use client"

import type { Table } from "@tanstack/react-table"
import { Download } from "lucide-react"

import { Button, exportTableToCSV } from "@incmix/ui2"
import { AddLocaleDialog } from "./add-locale"
import { AddTranslationDialog } from "./add-transtlation"
import { DeleteDialog } from "./delete-dialog"
import type { TranslationMessage } from "./types"

interface ToolbarActionsProps {
  table: Table<TranslationMessage>
  refetchData?: () => void
}

export function ToolbarActions({ table, refetchData }: ToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteDialog
          items={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => {
            table.toggleAllRowsSelected(false)
            refetchData?.()
          }}
        />
      ) : null}

      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
      <AddTranslationDialog onSuccess={refetchData} />
      <AddLocaleDialog onSuccess={refetchData} />
      <Button
        variant="outline"
        color="gray"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "users",
            excludeColumns: ["select", "actions"],
          })
        }
        className="gap-2"
      >
        <Download className="size-4" aria-hidden="true" />
        Export
      </Button>
    </div>
  )
}
