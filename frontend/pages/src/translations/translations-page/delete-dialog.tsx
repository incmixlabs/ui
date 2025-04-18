// @ts-nocheck
"use client"

import { useMutation } from "@tanstack/react-query"
import type { Row } from "@tanstack/react-table"
import { Trash } from "lucide-react"
import { Button, Dialog, ReactiveButton } from "@incmix/ui"
import { INTL_API_URL } from "@incmix/ui/constants"
import type { TranslationMessage } from "./types"

interface DeleteDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Root> {
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
    <Dialog.Root {...props}>
      {showTrigger ? (
        <Dialog.Trigger>
          <Button variant="outline" color="red">
            <Trash className="mr-2 size-4" />
            Delete ({items.length})
          </Button>
        </Dialog.Trigger>
      ) : null}
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Are you absolutely sure?</Dialog.Title>
          <Dialog.Description>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-medium">{items.length}</span>
            {items.length === 1 ? " item" : " items"} from our servers.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer className="gap-2 sm:space-x-0">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <ReactiveButton
            onClick={() => onDelete()}
            loading={isPending}
            aria-label="Delete selected rows"
          >
            Delete
          </ReactiveButton>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
