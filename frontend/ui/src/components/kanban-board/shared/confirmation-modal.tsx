// components/kanban-board/shared/confirmation-modal.tsx
import React from "react"
import { 
  Dialog,
  Box, 
  Button, 
  Flex, 
  Text, 
  Heading
} from "@incmix/ui"
import { AlertCircle, AlertTriangle, X, Trash2, Check } from "lucide-react"

export type ModalType = "delete" | "error" | "validation" | "success" | "warning" | "info"

export interface BaseModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
}

export interface ModalButtonProps {
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

export interface ModalStyleProps {
  type?: ModalType
  icon?: React.ReactNode
  iconColor?: string
}

/**
 * Unified modal component for confirmations, errors, warnings and information
 * Can be used for task deletion, column deletion, and other confirmation flows
 */
export function ConfirmationModal({
  isOpen,
  onOpenChange,
  title,
  description,
  type = "delete",
  icon,
  iconColor,
  primary,
  secondary
}: BaseModalProps & ModalButtonProps & ModalStyleProps) {
  // Handle the close action
  const handleClose = () => onOpenChange(false);
  
  // Determine icon and color based on type if not explicitly provided
  const modalIcon = icon || (
    type === "delete" ? <AlertTriangle size={24} /> :
    type === "error" ? <AlertCircle size={24} /> :
    type === "success" ? <Check size={24} /> :
    type === "warning" ? <AlertTriangle size={24} /> :
    <AlertCircle size={24} />
  );
  
  const modalIconColor = iconColor || (
    type === "delete" ? "text-amber-500" :
    type === "error" ? "text-red-500" :
    type === "success" ? "text-green-500" :
    type === "warning" ? "text-amber-500" :
    type === "info" ? "text-blue-500" :
    "text-gray-500"
  );
  
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content className="max-w-md">
        <Button
          variant="ghost"
          className="absolute right-4 top-4 h-8 w-8 p-0 rounded-full"
          aria-label="Close"
          onClick={handleClose}
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
                onClick={() => {
                  secondary.action();
                  handleClose();
                }}
                disabled={primary?.isLoading}
              >
                {secondary.label}
              </Button>
            )}
            
            {primary && (
              <Button
                onClick={() => {
                  primary.action();
                  if (!primary.isLoading) handleClose();
                }}
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
  );
}

// Common preset configurations for frequently used modal types
export const ModalPresets = {
  // For confirming task deletion
  deleteTask: (props: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    taskName?: string;
    onConfirm: () => void;
    isLoading?: boolean;
  }) => (
    <ConfirmationModal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      title="Delete Task"
      description={`Are you sure you want to delete ${props.taskName ? `"${props.taskName}"` : "this task"}? This action cannot be undone.`}
      type="delete"
      icon={<Trash2 size={24} />}
      primary={{
        label: "Delete Task",
        action: props.onConfirm,
        isLoading: props.isLoading,
        color: "bg-red-500 hover:bg-red-600"
      }}
      secondary={{
        label: "Cancel",
        action: () => {}
      }}
    />
  ),
  
  // For confirming column deletion
  deleteColumn: (props: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    columnName?: string;
    onConfirm: () => void;
    isLoading?: boolean;
  }) => (
    <ConfirmationModal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      title="Delete Column"
      description={`Are you sure you want to delete ${props.columnName ? `"${props.columnName}"` : "this column"}? All tasks in this column will also be deleted. This action cannot be undone.`}
      type="delete"
      primary={{
        label: "Delete Column",
        action: props.onConfirm,
        isLoading: props.isLoading,
        color: "bg-red-500 hover:bg-red-600"
      }}
      secondary={{
        label: "Cancel",
        action: () => {}
      }}
    />
  ),
  
  // For showing errors
  error: (props: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description: string;
    buttonLabel?: string;
  }) => (
    <ConfirmationModal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      title={props.title || "Error"}
      description={props.description}
      type="error"
      primary={{
        label: props.buttonLabel || "Understood",
        action: () => {}
      }}
    />
  ),
  
  // For validation messages
  validation: (props: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    message: string;
  }) => (
    <ConfirmationModal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      title="Validation Required"
      description={props.message}
      type="warning"
      primary={{
        label: "Okay",
        action: () => {}
      }}
    />
  )
};
