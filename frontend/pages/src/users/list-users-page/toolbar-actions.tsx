"use client"

import type { Table } from "@tanstack/react-table"
import { Download } from "lucide-react"

import { Button } from "@incmix/ui"
import { exportTableToCSV } from "@incmix/ui/data-table"
import type { UserAndProfile } from "@incmix/utils/types"
import { DeleteDialog } from "./delete-dialog"

interface ToolbarActionsProps {
  table: Table<UserAndProfile>
}

export function ToolbarActions({ table }: ToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteDialog
          items={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
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
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  )
}
