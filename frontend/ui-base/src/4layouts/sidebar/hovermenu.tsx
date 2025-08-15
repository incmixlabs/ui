import { Box } from "@/base"
import { useEffect, useRef, useState } from "react"

interface HoverMenuProps {
  children: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
  alignOffset?: number
  openDelay?: number
  closeDelay?: number
}

export function HoverMenu({
  children,
  content,
  disabled = false,
  side = "right",
  align = "center",
  sideOffset = 5,
  alignOffset = 0,
  openDelay = 50,
  closeDelay = 150,
}: HoverMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isHoveringRef = useRef(false)

  const clearTimeouts = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = null
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const handleOpen = () => {
    clearTimeouts()
    if (disabled) return

    openTimeoutRef.current = setTimeout(() => {
      setIsOpen(true)
      // Small delay to ensure content is rendered
      setTimeout(() => {
        setIsAnimating(true)
      }, 10)
    }, openDelay)
  }

  const handleClose = () => {
    clearTimeouts()
    closeTimeoutRef.current = setTimeout(() => {
      if (!isHoveringRef.current) {
        setIsAnimating(false)
        // Wait for animation to complete before unmounting
        setTimeout(() => {
          setIsOpen(false)
        }, 200)
      }
    }, closeDelay)
  }

  const handleMouseEnter = () => {
    isHoveringRef.current = true
    handleOpen()
  }

  const handleMouseLeave = () => {
    isHoveringRef.current = false
    handleClose()
  }

  const handleContentMouseEnter = () => {
    isHoveringRef.current = true
    clearTimeouts()
    setIsAnimating(true)
  }

  const handleContentMouseLeave = () => {
    isHoveringRef.current = false
    handleClose()
  }

  useEffect(() => {
    return () => clearTimeouts()
  }, [])

  const getAnimationStyles = () => {
    const baseStyles = {
      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
    } as const

    let transformOrigin = "top center"
    let closedTransform = "scale(0.95)"

    switch (side) {
      case "right":
        transformOrigin = "left center"
        closedTransform = "scale(0.95) translateX(-8px)"
        break
      case "left":
        transformOrigin = "right center"
        closedTransform = "scale(0.95) translateX(8px)"
        break
      case "bottom":
        transformOrigin = "top center"
        closedTransform = "scale(0.95) translateY(-8px)"
        break
      default:
        transformOrigin = "bottom center"
        closedTransform = "scale(0.95) translateY(8px)"
        break
    }

    if (isAnimating) {
      return {
        ...baseStyles,
        transformOrigin,
        opacity: 1,
        transform: "scale(1)",
      }
    }
    return {
      ...baseStyles,
      transformOrigin,
      opacity: 0,
      transform: closedTransform,
    }
  }

  const getContentPosition = () => {
    // Add viewport boundary checks
    switch (side) {
      case "right":
        return {
          left: "100%",
          marginLeft: `${sideOffset}px`,
          top:
            align === "start"
              ? `${alignOffset}px`
              : align === "end"
                ? "auto"
                : `calc(5% + ${alignOffset}px)`,
          bottom: align === "end" ? "0" : "auto",
          transform: align === "center" ? "translateY(-20%)" : "none",
        }
      case "left":
        return {
          right: "100%",
          marginRight: `${sideOffset}px`,
          top:
            align === "start"
              ? `${alignOffset}px`
              : align === "end"
                ? "auto"
                : `calc(10% + ${alignOffset}px)`,
          bottom: align === "end" ? "0" : "auto",
          transform: align === "center" ? "translateY(-10%)" : "none",
        }
      case "top":
        return {
          bottom: "100%",
          marginBottom: `${sideOffset}px`,
          left:
            align === "start"
              ? `${alignOffset}px`
              : align === "end"
                ? "auto"
                : `calc(50% + ${alignOffset}px)`,
          right: align === "end" ? "0" : "auto",
          transform: align === "center" ? "translateX(-50%)" : "none",
        }
      case "bottom":
        return {
          top: "100%",
          marginTop: `${sideOffset}px`,
          left:
            align === "start"
              ? `${alignOffset}px`
              : align === "end"
                ? "auto"
                : `calc(50% + ${alignOffset}px)`,
          right: align === "end" ? "0" : "auto",
          transform: align === "center" ? "translateX(-50%)" : "none",
        }
      default:
        return {}
    }
  }

  // console.log(content);

  return (
    <Box
      ref={containerRef}
      style={{ position: "relative", display: "contents" }}
    >
      <Box
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleOpen()
          }
          if (e.key === "Escape") {
            handleClose()
          }
        }}
        tabIndex={0}
        style={{ display: "contents" }}
      >
        {children}
      </Box>
      {isOpen && (
        <Box
          ref={contentRef}
          style={{
            position: "absolute",
            zIndex: 9999,
            pointerEvents: isAnimating ? "auto" : "none",
            ...getContentPosition(),
            ...getAnimationStyles(),
          }}
          onMouseEnter={handleContentMouseEnter}
          onMouseLeave={handleContentMouseLeave}
        >
          <Box className="rounded-md border border-gray-4 bg-gray-2 text-gray-12 shadow-lg">
            {content}
          </Box>
        </Box>
      )}
    </Box>
  )
}
