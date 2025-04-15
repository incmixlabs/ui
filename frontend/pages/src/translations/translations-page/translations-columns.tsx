import {
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
} from "@incmix/ui"
import {
  type ColumnDef,
  DataTableColumnHeader,
  type DataTableRowAction } from "@incmix/ui/data-table"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
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
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
                icon={<DotsHorizontalIcon className="size-4" color="black" />}
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item
                onClick={() => {
                  setRowAction({
                    type: "update",
                    row,
                  })
                }}
              >
                Edit
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => {
                  setRowAction({
                    type: "delete",
                    row,
                  })
                }}
              >
                Delete
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )
      },
      size: 40,
    },
  ]
}
