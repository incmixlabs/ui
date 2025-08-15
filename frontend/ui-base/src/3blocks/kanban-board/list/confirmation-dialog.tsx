import { Box, Button, Dialog, Flex, Text } from "@/base"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import React from "react"

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  isDestructive?: boolean
  isLoading?: boolean
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
  isLoading = false,
}: ConfirmationDialogProps) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open: boolean) => !open && onClose()}
    >
      <Dialog.Content size="3">
        <Dialog.Title>
          <Flex gap="2" align="center">
            {isDestructive ? (
              <AlertTriangle size={18} className="text-amber-500" />
            ) : (
              <CheckCircle2 size={18} className="text-emerald-500" />
            )}
            {title}
          </Flex>
        </Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
        <Flex gap="3" justify="end" mt="4">
          <Button
            variant="soft"
            color="gray"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={isDestructive ? "solid" : "soft"}
            color={isDestructive ? "red" : "blue"}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {confirmText}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
