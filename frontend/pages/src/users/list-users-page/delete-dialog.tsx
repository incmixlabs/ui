"use client"

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@incmix/ui"
import type { UserAndProfile } from "@incmix/utils/types"
import type { Row } from "@tanstack/react-table"
import { Trash } from "lucide-react"

interface DeleteDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Root> {
  items: Row<UserAndProfile>["original"][]
  showTrigger?: boolean
  onSuccess?: () => void
}

export function DeleteDialog({
  items,
  showTrigger = true,
  onSuccess,
  ...props
}: DeleteDialogProps) {
  return (
    <Dialog.Root {...props}>
      {showTrigger ? (
        <Dialog.Trigger>
          <Button variant="outline">
            <Trash className="mr-2 size-4" />
            Delete ({items.length})
          </Button>
        </Dialog.Trigger>
      ) : null}
      <Dialog.Content>
        <DialogHeader>
          <Dialog.Title>Are you absolutely sure?</Dialog.Title>
          <Dialog.Description>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-medium">{items.length}</span>
            {items.length === 1 ? " user" : " users"} from our servers.
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
