"use client"

import { Button, Dialog, DialogFooter, DialogHeader } from "@incmix/ui"

type DeleteDialogProps = {
  item: { id: number; name: string }
  onSuccess?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DeleteDialog({ item, onSuccess, ...props }: DeleteDialogProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Content>
        <DialogHeader>
          <Dialog.Title>Are you absolutely sure?</Dialog.Title>
          <Dialog.Description>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-medium">{item.name}</span> from our servers.
          </Dialog.Description>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button aria-label="Delete selected rows">Delete</Button>
        </DialogFooter>
      </Dialog.Content>
    </Dialog.Root>
  )
}
