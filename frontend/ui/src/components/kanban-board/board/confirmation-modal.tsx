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
import { AlertCircle, AlertTriangle, X, LucideIcon } from "lucide-react"

type ModalType = "delete" | "error" | "validation"

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
}

interface ModalButtonProps {
  primary?: {
    label: string
    action: () => void
    color?: string
    isLoading?: boolean
  }
  secondary?: {
    label: string
    action: () => void
  }
}

interface ModalStyleProps {
  type?: ModalType
  icon?: React.ReactNode
  iconColor?: string
}

/**
 * Unified modal component for all confirmation, error, and validation cases
 */
function ModalComponent({
  isOpen,
  onClose,
  title,
  description,
  type = "delete",
  icon,
  iconColor,
  primary,
  secondary
}: BaseModalProps & ModalButtonProps & ModalStyleProps) {
  // Determine icon and color based on type if not explicitly provided
  const modalIcon = icon || (
    type === "delete" ? <AlertTriangle size={24} /> :
    type === "error" ? <AlertCircle size={24} /> :
    <AlertCircle size={24} />
  )
  
  const modalIconColor = iconColor || (
    type === "delete" ? "text-amber-500" :
    type === "error" ? "text-red-500" :
    "text-amber-500"
  )
  
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
            <Box className={modalIconColor}>{modalIcon}</Box>
            <Heading size="4">{title}</Heading>
          </Flex>
          
          <Text className="text-gray-500 dark:text-gray-400">
            {description}
          </Text>
          
          <Flex justify="end" gap="3" mt="4">
            {secondary && (
              <Button
                variant="soft"
                onClick={secondary.action}
                disabled={primary?.isLoading}
              >
                {secondary.label}
              </Button>
            )}
            
            {primary && (
              <Button
                onClick={primary.action}
                disabled={primary.isLoading}
                variant="solid"
                className={primary.color ? primary.color : ""}
              >
                {primary.isLoading ? `${primary.label}...` : primary.label}
              </Button>
            )}
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

// Legacy API compatibility interfaces
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

export interface ErrorModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  buttonLabel?: string
}

export interface ValidationModalProps {
  isOpen: boolean
  onClose: () => void
  message: string
}

// Legacy API component implementations
export function DeleteConfirmationModal(props: ConfirmationModalProps) {
  const {
    isOpen,
    onClose,
    title,
    description,
    confirmLabel = "Delete Column",
    cancelLabel = "Cancel",
    isLoading = false,
    onConfirm
  } = props;
  
  return (
    <ModalComponent
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      type="delete"
      primary={{
        label: confirmLabel,
        action: onConfirm,
        isLoading,
        color: "bg-red-500 hover:bg-red-600"
      }}
      secondary={{
        label: cancelLabel,
        action: onClose
      }}
    />
  );
}

export function ErrorModal(props: ErrorModalProps) {
  const {
    isOpen,
    onClose,
    title,
    description,
    buttonLabel = "Understood"
  } = props;
  
  return (
    <ModalComponent
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      type="error"
      primary={{
        label: buttonLabel,
        action: onClose
      }}
    />
  );
}

export function ValidationModal(props: ValidationModalProps) {
  const {
    isOpen,
    onClose,
    message
  } = props;
  
  return (
    <ModalComponent
      isOpen={isOpen}
      onClose={onClose}
      title="Validation Required"
      description={message}
      type="validation"
      primary={{
        label: "Okay",
        action: onClose
      }}
    />
  );
}
