import { Box, Flex, Heading, IconButton, Text } from "@incmix/ui"
import { cn } from "@utils/cn"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"

interface SheetProps {
  children: React.ReactNode
  title?: string
  description?: string
  side?: "top" | "right" | "bottom" | "left"
  open?: boolean
  onOpenChange?: (open: boolean) => void
  closeOnOutsideClick?: boolean
  closeOnEsc?: boolean
  showCloseButton?: boolean
  overlayColor?: string
  closeButtonText?: string
  contentBackground?: string
  className?: string
  isFilterClassName?: string
  shadow?: string
  zIndex?: number
  isFilter?: boolean
}

export const MotionSheet: React.FC<SheetProps> = ({
  children,
  title,
  description,
  side = "right",
  open = false,
  isFilterClassName = "w-[30rem] 2xl:w-[40rem]",
  isFilter = false,
  shadow = "0 0 10px rgba(0, 0, 0, 0.2)",
  onOpenChange,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  overlayColor = "rgba(0, 0, 0, 0.5)",
  className,
  zIndex = 60,
}) => {
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === "Escape" && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, closeOnEsc])

  const handleClose = () => {
    setIsOpen(false)
    if (onOpenChange) {
      onOpenChange(false)
    }
  }

  // Determine animation variants based on side
  const getSheetVariants = () => {
    const variants = {
      hidden: {},
      visible: {},
    }

    switch (side) {
      case "right":
        variants.hidden = { x: "100%" }
        variants.visible = { x: 0 }
        break
      case "left":
        variants.hidden = { x: "-100%" }
        variants.visible = { x: 0 }
        break
      case "top":
        variants.hidden = { y: "-100%" }
        variants.visible = { y: 0 }
        break
      case "bottom":
        variants.hidden = { y: "100%" }
        variants.visible = { y: 0 }
        break
    }

    return variants
  }

  const positionClasses = {
    right: "top-2 right-3 rounded-lg",
    left: "top-0 left-0 rounded-lg",
    top: "top-0 left-0 right-0 w-full rounded-lg",
    bottom: "bottom-0 left-0 right-0 w-full rounded-lg",
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {!isFilter && (
            <motion.div
              key="sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: overlayColor,
                zIndex: zIndex - 1,
              }}
              onClick={closeOnOutsideClick ? handleClose : undefined}
            />
          )}
          <motion.div
            key="sheet-content"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={getSheetVariants()}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={cn(
              // Base styles for all sheets
              isFilter
                ? isFilterClassName
                : "fixed h-[98vh] w-96 max-w-full bg-gray-3 p-5 py-4",
              positionClasses[side],
              className
            )}
            style={{
              zIndex,
              boxShadow: shadow,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {(title || description || showCloseButton) && (
              <Flex align={"center"} justify={"between"}>
                <Box>
                  {title && (
                    <Heading
                      style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}
                    >
                      {title}
                    </Heading>
                  )}
                  {description && (
                    <Text
                      style={{
                        margin: "4px 0 0 0",
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      {description}
                    </Text>
                  )}
                </Box>
                {showCloseButton && (
                  <IconButton onClick={handleClose} color="gray" type="button">
                    <X />
                  </IconButton>
                )}
              </Flex>
            )}

            <Box className="flex-1 ">{children}</Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
