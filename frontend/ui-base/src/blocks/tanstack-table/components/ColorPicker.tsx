import { Button } from "@/base"
import { useEffect, useRef, useState } from "react"
import type { CSSProperties, FC } from "react"
interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  // Optional prop to determine if component is inside a dialog
  insideDialog?: boolean
}

// Add these styles to your global CSS or add them inline as we do here
const colorOptionStyle: CSSProperties = {
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  cursor: "pointer",
  transition: "transform 0.2s ease",
}

const colorOptionHoverStyle: CSSProperties = {
  transform: "scale(1.15)",
}

/**
 * Simplified color picker component with circular options
 */
const ColorPicker: FC<ColorPickerProps> = ({
  color,
  onChange,
  insideDialog = false,
}) => {
  const [showPicker, setShowPicker] = useState(false)
  const [hoveredColor, setHoveredColor] = useState<string | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  // Color palette
  const colors = [
    "var(--sky-9)",
    "var(--green-9)",
    "var(--red-9)",
    "var(--yellow-9)",
    "var(--purple-9)",
    "var(--pink-9)"
  ]

  // Close picker when clicking outside
  useEffect(() => {
    if (!showPicker) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        buttonRef.current &&
        popupRef.current &&
        !buttonRef.current.contains(target) &&
        !popupRef.current.contains(target)
      ) {
        setShowPicker(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside, { capture: true })
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, { capture: true })
    }
  }, [showPicker])

  const handleColorSelect = (selectedColor: string) => {
    onChange(selectedColor)
    setShowPicker(false)
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        ref={buttonRef}
        aria-haspopup="true"
        aria-expanded={showPicker}
        aria-label="Open color picker"
        onClick={(e) => {
          // Stop propagation to prevent dialog from closing
          if (insideDialog) {
            e.stopPropagation()
          }
          setShowPicker(!showPicker)
        }}
        onMouseDown={(e) => {
          if (insideDialog) e.stopPropagation()
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            if (insideDialog) {
              e.stopPropagation()
            }
            setShowPicker((prev) => !prev)
          }
        }}
        style={{
          width: "28px",
          height: "28px",
          backgroundColor: color || "var(--gray-3)",
          border: "1px solid var(--gray-6)",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      />

      {showPicker && (
        <div
          ref={popupRef}
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            zIndex: 1000,
            backgroundColor: "white",
            border: "1px solid var(--gray-6)",
            borderRadius: "8px",
            padding: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            width: "200px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
          onMouseDown={(e) => {
            if (insideDialog) e.stopPropagation()
          }}
        >
          {colors.map((optionColor, index) => {
            const isSelected = color === optionColor
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  if (insideDialog) {
                    e.stopPropagation()
                  }
                  handleColorSelect(optionColor)
                }}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && insideDialog) {
                    e.stopPropagation()
                  }
                }}
                onMouseEnter={() => setHoveredColor(optionColor)}
                onMouseLeave={() => setHoveredColor(null)}
                style={{
                  ...colorOptionStyle,
                  backgroundColor: optionColor,
                  border: isSelected ? "3px solid var(--gray-12)" : "1px solid var(--gray-6)",
                  ...(hoveredColor === optionColor ? colorOptionHoverStyle : {}),
                }}
                srLabel={`Select color ${index + 1}`}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ColorPicker
