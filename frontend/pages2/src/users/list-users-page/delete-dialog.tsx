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
  Dialog.Trigger,
} from "@incmix/ui2"
import type { UserAndProfile } from "@incmix/utils/types"
import type { Row } from "@tanstack/react-table"
import { Trash } from "lucide-react"

interface DeleteDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
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
    <Dialog {...props}>
      {showTrigger ? (
        <Dialog.Trigger>
          <Button variant="outline">
            <Trash className="mr-2 size-4" />
            Delete ({items.length})
          </Button>
        </Dialog.Trigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-medium">{items.length}</span>
            {items.length === 1 ? " user" : " users"} from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </DialogClose>
          <Button aria-label="Delete selected rows">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
