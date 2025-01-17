"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@incmix-fe/ui"
import { Button } from "@radix-ui/themes"
import type { UserAndProfile } from "@jsprtmnn/utils/types"
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
        <DialogTrigger>
          <Button variant="outline">
            <Trash className="mr-2 size-4" />
            Delete ({items.length})
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-medium">{items.length}</span>
            {items.length === 1 ? " task" : " tasks"} from our servers.
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
