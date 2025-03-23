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
  ReactiveButton,
} from "@incmix/ui"
import { Button } from "@incmix/ui"
import { INTL_API_URL } from "@incmix/ui/constants"
import { useMutation } from "@tanstack/react-query"
import type { Row } from "@tanstack/react-table"
import { Trash } from "lucide-react"
import { useState } from "react"
import type { TranslationMessage } from "./types"

interface DeleteDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  items: Row<TranslationMessage>["original"][]
  showTrigger?: boolean
  onSuccess?: () => void
}

export function DeleteDialog({
  items,
  showTrigger = true,
  onSuccess,
  ...props
}: DeleteDialogProps) {
  const { mutate: onDelete, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${INTL_API_URL}/messages`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
        }),
      })

      const data = (await res.json()) as { message: string }
      if (!res.ok) throw new Error(data.message)

      return data
    },
    onSuccess,
  })

  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger>
          <Button variant="outline" color="red">
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
            {items.length === 1 ? " item" : " items"} from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </DialogClose>
          <ReactiveButton
            onClick={() => onDelete()}
            loading={isPending}
            aria-label="Delete selected rows"
          >
            Delete
          </ReactiveButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
