import { Box, Button, Dialog, Flex, Text } from "@radix-ui/themes"
import React from "react"

type SheetProps = {
  children: React.ReactNode
  trigger?: React.ReactNode
  title?: string
  description?: string
  side?: "top" | "right" | "bottom" | "left"
  open?: boolean
  onOpenChange?: (open: boolean) => void
  width?: string
  height?: string
}

export const Sheet = ({
  children,
  trigger,
  title,
  description,
  side = "right",
  open,
  onOpenChange,
  width = "30rem",
  height = "50vh",
}: SheetProps) => {
  // Custom styles for the sheet content
  const getSheetStyles = () => {
    // Base styles for all directions
    const baseStyles = {
      padding: 0,
      borderRadius: 0,
      backgroundColor: "white",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      position: "fixed",
      zIndex: 1000,
    }

    // Direction-specific styles
    switch (side) {
      case "top":
        return {
          ...baseStyles,
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          height,
          transform: open ? "translateY(0)" : "translateY(-100%)",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }
      case "right":
        return {
          ...baseStyles,
          top: 0,
          right: 0,
          bottom: 0,
          width,
          height: "100%",
          transform: open ? "translateX(0)" : "translateX(100%)",
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
        }
      case "bottom":
        return {
          ...baseStyles,
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height,
          transform: open ? "translateY(0)" : "translateY(100%)",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }
      case "left":
        return {
          ...baseStyles,
          top: 0,
          left: 0,
          bottom: 0,
          width,
          height: "100%",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",
        }
      default:
        return baseStyles
    }
  }

  // Backdrop overlay
  const backdropStyles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 999,
    backdropFilter: "blur(2px)",
    transition: "opacity 300ms ease",
    opacity: open ? 1 : 0,
    pointerEvents: open ? "auto" : "none",
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger>{trigger}</Dialog.Trigger>}

      {/* Custom backdrop overlay */}
      <Box style={backdropStyles} onClick={() => onOpenChange?.(false)} />

      {/* Sheet content */}
      <Dialog.Content
        style={getSheetStyles() as React.CSSProperties}
        onPointerDownOutside={(e) => e.preventDefault()} // Prevent closing on click inside content
      >
        <Flex direction="column" height="100%">
          <Flex
            p="4"
            justify="between"
            align="center"
            style={{ borderBottom: "1px solid var(--gray-5)" }}
          >
            <Flex direction="column" gap="1">
              {title && <Dialog.Title>{title}</Dialog.Title>}
              {description && (
                <Text size="2" color="gray">
                  {description}
                </Text>
              )}
            </Flex>
            <Dialog.Close>
              <Button variant="soft" color="gray" size="2">
                Close
              </Button>
            </Dialog.Close>
          </Flex>

          <Box style={{ overflow: "auto", flex: 1 }} p="4">
            {children}
          </Box>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

// Usage Example
export const SheetExample = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <Flex p="4" gap="4">
      <Button onClick={() => setOpen(true)}>Open Sheet</Button>

      <Sheet
        title="Edit Profile"
        description="Make changes to your profile information."
        side="right"
        open={open}
        onOpenChange={setOpen}
      >
        <Flex direction="column" gap="4">
          <Text as="p">This is the content of the sheet.</Text>
          <Text as="p">
            You can put form elements or any other content here.
          </Text>
          <Button onClick={() => setOpen(false)}>Done</Button>
        </Flex>
      </Sheet>
    </Flex>
  )
}
