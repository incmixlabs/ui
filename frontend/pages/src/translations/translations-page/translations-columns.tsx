import { Badge, Checkbox, DropdownMenuWrapper } from "@incmix/ui"
import {
  type ColumnDef,
  DataTableColumnHeader,
  type DataTableRowAction,
} from "@incmix/ui/data-table"
import { MoreHorizontal } from "lucide-react"
import type { TranslationMessage } from "./types"

type GetColumnsProps = {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<TranslationMessage> | null>
  >
}

export function getColumns({
  setRowAction,
}: GetColumnsProps): ColumnDef<TranslationMessage>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      enableHiding: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Id" />
      ),
    },
    {
      accessorKey: "locale",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Locale" />
      ),
      enableMultiSort: true,
    },
    {
      accessorKey: "namespace",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Namespace" />
      ),
      enableMultiSort: true,
    },
    {
      accessorKey: "key",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Key" />
      ),
      enableMultiSort: true,
    },
    {
      accessorKey: "value",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Value" />
      ),
      enableMultiSort: true,
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      enableMultiSort: true,
      cell: ({ row }) => <Badge>{row.getValue("type")}</Badge>,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        return (
          <DropdownMenuWrapper
            button={{
              "aria-label": "Open menu",
              variant: "ghost",
              className: "flex size-8 p-0 data-[state=open]:bg-muted",
              icon: <MoreHorizontal className="size-4" color="black" />,
            }}
            items={[
              {
                icon: <MoreHorizontal />,
                label: "Edit",
                onClick: () => {
                  setRowAction({
                    type: "update",
                    row,
                  })
                },
                separator: true,
              },
              {
                icon: <MoreHorizontal />,
                label: "Delete",
                onClick: () => {
                  setRowAction({
                    type: "delete",
                    row,
                  })
                },
              },
            ]}
          />
        )
      },
      size: 40,
    },
  ]
}
