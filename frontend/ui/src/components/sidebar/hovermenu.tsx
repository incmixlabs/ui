import React, { useState, useRef, useEffect } from 'react'

interface HoverMenuProps {
  children: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  alignOffset?: number
  openDelay?: number
  closeDelay?: number
}

export function HoverMenu({
  children,
  content,
  disabled = false,
  side = 'right',
  align = 'center',
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
      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      transformOrigin: side === 'right' ? 'left center' : 'right center',
    }

    if (isAnimating) {
      return {
        ...baseStyles,
        opacity: 1,
        transform: 'scale(1) translateX(0)',
      }
    } else {
      return {
        ...baseStyles,
        opacity: 0,
        transform: side === 'right' ? 'scale(0.95) translateX(-8px)' : 'scale(0.95) translateX(8px)',
      }
    }
  }

  const getContentPosition = () => {
    switch (side) {
      case 'right':
        return {
          left: '100%',
          marginLeft: `${sideOffset}px`,
          top: align === 'start' ? '0' : align === 'end' ? 'auto' : '-10%',
          bottom: align === 'end' ? '0' : 'auto',
          transform: align === 'center' ? 'translateY(-20%)' : 'none',
        }
      case 'left':
        return {
          right: '100%',
          marginRight: `${sideOffset}px`,
          top: align === 'start' ? '0' : align === 'end' ? 'auto' : '10%',
          bottom: align === 'end' ? '0' : 'auto',
          transform: align === 'center' ? 'translateY(-10%)' : 'none',
        }
      case 'top':
        return {
          bottom: '100%',
          marginBottom: `${sideOffset}px`,
          left: align === 'start' ? '0' : align === 'end' ? 'auto' : '50%',
          right: align === 'end' ? '0' : 'auto',
          transform: align === 'center' ? 'translateX(-50%)' : 'none',
        }
      case 'bottom':
        return {
          top: '100%',
          marginTop: `${sideOffset}px`,
          left: align === 'start' ? '0' : align === 'end' ? 'auto' : '50%',
          right: align === 'end' ? '0' : 'auto',
          transform: align === 'center' ? 'translateX(-50%)' : 'none',
        }
      default:
        return {}
    }
  }
  
// console.log(content);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'contents' }}>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'contents' }}
      >
        {children}
      </div>
      {isOpen && (
        <div
          ref={contentRef}
          style={{
            position: 'absolute',
            zIndex: 9999,
            pointerEvents: isAnimating ? 'auto' : 'none',
            ...getContentPosition(),
            ...getAnimationStyles(),
          }}
          onMouseEnter={handleContentMouseEnter}
          onMouseLeave={handleContentMouseLeave}
        >
          <div className="rounded-md border border-gray-4 bg-gray-2 shadow-lg">
            {content}
          </div>
        </div>
      )}
    </div>
  )
}