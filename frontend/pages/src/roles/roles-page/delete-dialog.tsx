"use client"

import { Button, Dialog, DialogFooter, DialogHeader } from "@incmix/ui"
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
        <DialogHeader>
          <Dialog.Title>Are you absolutely sure?</Dialog.Title>
          <Dialog.Description>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-medium capitalize">{items[0]?.name}</span>{" "}
            role and related permissions from our servers.
          </Dialog.Description>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            aria-label="Delete selected rows"
            color="red"
            onClick={() => {
              deleteMutation.mutate(items[0].id)
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog.Content>
    </Dialog.Root>
  )
}
