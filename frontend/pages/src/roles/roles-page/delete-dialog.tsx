"use client"

import { Button, Dialog } from "@incmix/ui/base"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteRole } from "./actions"
type DeleteDialogProps = {
  items: { id: number; name: string }[]
  onSuccess?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DeleteDialog({
  items,
  onSuccess,
  ...props
}: DeleteDialogProps) {
  const deleteMutation = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      toast.success("Role deleted successfully")
      onSuccess?.()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  return (
    <Dialog.Root {...props}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Are you absolutely sure?</Dialog.Title>
          <Dialog.Description>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-medium capitalize">
              {items.length === 1
                ? items[0]?.name
                : `${items.length} selected roles`}
            </span>{" "}
            and related permissions from our servers.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            aria-label="Delete selected rows"
            color="red"
            onClick={async () => {
              for (const item of items) {
                await deleteMutation.mutateAsync(item.id)
              }
            }}
          >
            Delete
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
