import { Box, Button, Dialog, Flex, Heading, Text, TextField } from "@/base"
import { Pencil, X } from "lucide-react"
// components/kanban-board/shared/edit-checklist-item-modal.tsx
import type React from "react"
import { useEffect, useState } from "react"

export interface EditChecklistItemModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  initialText: string
  onSave: (newText: string) => void
  isLoading?: boolean
}

/**
 * Modal for editing checklist items
 */
export function EditChecklistItemModal({
  isOpen,
  onOpenChange,
  initialText,
  onSave,
  isLoading = false,
}: EditChecklistItemModalProps) {
  const [text, setText] = useState(initialText)

  // Reset text when modal opens
  useEffect(() => {
    if (isOpen) {
      setText(initialText)
    }
  }, [isOpen, initialText])

  // Prevent closing while loading
  const handleClose = () => {
    if (!isLoading) {
      onOpenChange(false)
    }
  }

  const handleSave = () => {
    if (text.trim()) {
      onSave(text.trim())
      if (!isLoading) {
        handleClose()
      }
    }
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={isLoading ? undefined : onOpenChange}
    >
      <Dialog.Content className="max-w-md">
        <Button
          variant="ghost"
          className="absolute top-4 right-4 h-8 w-8 rounded-full p-0"
          aria-label="Close"
          onClick={handleClose}
        >
          <X size={16} />
        </Button>

        <Flex direction="column" gap="4">
          <Flex align="center" gap="3">
            <Box className="text-blue-500">
              <Pencil size={24} />
            </Box>
            <Heading size="4">Edit Checklist Item</Heading>
          </Flex>

          <TextField.Root
            placeholder="Enter checklist item text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleSave()
              }
            }}
            className="w-full"
            autoFocus
          />

          <Flex justify="end" gap="3" mt="4">
            <Button variant="soft" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              disabled={isLoading || !text.trim()}
              variant="solid"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
