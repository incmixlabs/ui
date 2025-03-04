import { AnimatePresence, motion } from "framer-motion"
import type React from "react"
import { useEffect, useState } from "react"

interface SheetProps {
  children: React.ReactNode
  title?: string
  description?: string
  side?: "top" | "right" | "bottom" | "left"
  open?: boolean
  onOpenChange?: (open: boolean) => void
  width?: string | number
  height?: string | number
  closeOnOutsideClick?: boolean
  closeOnEsc?: boolean
  showCloseButton?: boolean
  overlayColor?: string
  closeButtonText?: string
  headerBackground?: string
  contentBackground?: string
  zIndex?: number
}

export const MotionSheet: React.FC<SheetProps> = ({
  children,
  title,
  description,
  side = "right",
  open = false,
  onOpenChange,
  width = "400px",
  height = "100vh",
  closeOnOutsideClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  overlayColor = "rgba(0, 0, 0, 0.5)",
  closeButtonText = "Close",
  headerBackground = "white",
  contentBackground = "white",
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

  // Determine sheet position and dimensions
  const getSheetStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: "fixed",
      backgroundColor: contentBackground,
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      display: "flex",
      flexDirection: "column",
      zIndex,
      overflow: "hidden",
      maxWidth: "100vw",
      maxHeight: "100vh",
    }

    switch (side) {
      case "right":
        return {
          ...baseStyle,
          top: 0,
          right: 0,
          width,
          height,
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
        }
      case "left":
        return {
          ...baseStyle,
          top: 0,
          left: 0,
          width,
          height,
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",
        }
      case "top":
        return {
          ...baseStyle,
          top: 0,
          left: 0,
          right: 0,
          height,
          width: "100%",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }
      case "bottom":
        return {
          ...baseStyle,
          bottom: 0,
          left: 0,
          right: 0,
          height,
          width: "100%",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
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

          <motion.div
            key="sheet-content"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={getSheetVariants()}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={getSheetStyle()}
          >
            {(title || description || showCloseButton) && (
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: headerBackground,
                }}
              >
                <div>
                  {title && (
                    <h3
                      style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}
                    >
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p
                      style={{
                        margin: "4px 0 0 0",
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <button
                    onClick={handleClose}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    {closeButtonText}
                  </button>
                )}
              </div>
            )}

            <div
              style={{
                padding: "16px",
                overflowY: "auto",
                flexGrow: 1,
              }}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
