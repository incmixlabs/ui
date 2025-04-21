import {
  Badge,
  Button,
  Checkbox,
  type ColumnDef,
  DataTableColumnHeader,
  type DataTableRowAction,
  DropdownMenu,
  GoogleIcon,
  Spinner,
  Switch,
  toast,
} from "@incmix/ui"
import type { UserAndProfile } from "@incmix/utils/types"
import { MoreHorizontal as DotsHorizontalIcon } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { setEnabled, setVerified } from "./actions"

type GetColumnsProps = {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<UserAndProfile> | null>
  >
}

export function getColumns({
  setRowAction,
}: GetColumnsProps): ColumnDef<UserAndProfile>[] {
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
      accessorKey: "fullName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Full Name" />
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: "oauth",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="OAuth" />
      ),
      cell: ({ row }) => {
        const value = row.getValue<string | null>("oauth")
        if (!value)
          return (
            <Badge variant="outline" size="1">
              None
            </Badge>
          )

        return <GoogleIcon />
      },
    },
    {
      accessorKey: "enabled",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Enabled" />
      ),
      cell: ({ row }) => {
        const value = row.getValue<boolean>("enabled")
        const id = row.getValue<string>("id")
        const qc = useQueryClient()
        console.log(id)
        const { mutate, isPending } = useMutation({
          mutationFn: setEnabled,
          onSuccess: (data) => {
            qc.invalidateQueries({ queryKey: ["user-list"] })
            toast.success(data.message)
          },
          onError: (error) => {
            toast.error(error.message)
          },
        })

        if (isPending) return <Spinner />

        return (
          <Switch
            checked={value}
            onCheckedChange={(value) => mutate({ id, value })}
            disabled={isPending}
          />
        )
      },
    },
    {
      accessorKey: "verified",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Verified" />
      ),
      cell: ({ row }) => {
        const value = row.getValue<boolean>("verified")
        const id = row.getValue<string>("id")
        const qc = useQueryClient()
        const { mutate, isPending } = useMutation({
          mutationFn: setVerified,
          onSuccess: (data) => {
            qc.invalidateQueries({ queryKey: ["user-list"] })
            toast.success(data.message)
          },
          onError: (error) => {
            toast.error(error.message)
          },
        })
        if (isPending) return <Spinner />
        return (
          <Switch
            checked={value}
            onCheckedChange={(value) => mutate({ id, value })}
            disabled={isPending}
          />
        )
      },
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
