// components/board/confirmation-modal.tsx
import React from "react"
import { 
  Dialog,
  Box, 
  Button, 
  Flex, 
  Text, 
  Heading
} from "@incmix/ui"
import { AlertCircle, AlertTriangle, X } from "lucide-react"

export interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  isLoading?: boolean
  onConfirm: () => void
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  title,
  description,
  confirmLabel = "Delete Column",
  cancelLabel = "Cancel",
  isLoading = false,
  onConfirm
}: ConfirmationModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className="max-w-md">
        <Button
          variant="ghost"
          className="absolute right-4 top-4 h-8 w-8 p-0 rounded-full"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={16} />
        </Button>
        
        <Flex direction="column" gap="4">
          <Flex align="center" gap="3">
            <AlertTriangle className="text-amber-500" size={24} />
            <Heading size="4">{title}</Heading>
          </Flex>
          
          <Text className="text-gray-500 dark:text-gray-400">
            {description}
          </Text>
          
          <Flex justify="end" gap="3" mt="4">
            <Button
              variant="soft"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelLabel}
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              variant="solid"
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? "Deleting..." : confirmLabel}
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export interface ErrorModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  buttonLabel?: string
}

export function ErrorModal({
  isOpen,
  onClose,
  title,
  description,
  buttonLabel = "Understood"
}: ErrorModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className="max-w-md">
        <Button
          variant="ghost"
          className="absolute right-4 top-4 h-8 w-8 p-0 rounded-full"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={16} />
        </Button>
        
        <Flex direction="column" gap="4">
          <Flex align="center" gap="3">
            <AlertCircle className="text-red-500" size={24} />
            <Heading size="4">{title}</Heading>
          </Flex>
          
          <Text className="text-gray-500 dark:text-gray-400">
            {description}
          </Text>
          
          <Flex justify="end" gap="3" mt="4">
            <Button onClick={onClose}>
              {buttonLabel}
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export interface ValidationModalProps {
  isOpen: boolean
  onClose: () => void
  message: string
}

export function ValidationModal({
  isOpen,
  onClose,
  message
}: ValidationModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className="max-w-md">
        <Button
          variant="ghost"
          className="absolute right-4 top-4 h-8 w-8 p-0 rounded-full"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={16} />
        </Button>
        
        <Flex direction="column" gap="4">
          <Flex align="center" gap="3">
            <AlertCircle className="text-red-500" size={24} />
            <Heading size="4">Validation Error</Heading>
          </Flex>
          
          <Text className="text-gray-500 dark:text-gray-400">
            {message}
          </Text>
          
          <Flex justify="end" gap="3" mt="4">
            <Button onClick={onClose}>
              Okay
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
