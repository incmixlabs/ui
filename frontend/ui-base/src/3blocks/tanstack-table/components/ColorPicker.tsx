import { Button } from "@/radix-ui"
import { cn } from "@/shadcn/lib/utils"
import { Popover } from "@/src/1base"
import BaseColorPicker, {
  type ColorSelectType,
} from "@/src/2elements/color-picker"
import { normalizeToHex } from "@incmix/store/color"
import { useState } from "react"
import type { FC } from "react"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  // Optional prop to determine if component is inside a dialog
  insideDialog?: boolean
  size?: "sm" | "md" | "lg"
  // Color picker mode - determines which colors to show
  colorType?: "base" | "all" | "monochromatic" | "monochromatic-shades-only"
  // Base color for monochromatic mode
  baseColor?: string
}

/**
 * Table color picker component that wraps the base ColorPicker with popover functionality
 */
const ColorPicker: FC<ColorPickerProps> = ({
  color,
  onChange,
  insideDialog = false,
  size = "md",
  colorType = "all",
  baseColor = "blue",
}) => {
  const [open, setOpen] = useState(false)

  const handleColorSelect = (colorData: ColorSelectType) => {
    onChange(colorData.hex)
    setOpen(false)
  }

  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-7 w-7",
    lg: "h-8 w-8",
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <Button
          type="button"
          aria-label="Select color"
          className={cn(
            "cursor-pointer rounded border border-gray-6 transition-colors hover:border-gray-7 focus:outline-none focus:ring-2 focus:ring-blue-8 focus:ring-offset-1",
            sizeClasses[size]
          )}
          style={{
            backgroundColor: color || "var(--gray-3)",
          }}
          onClick={(e) => {
            if (insideDialog) {
              e.stopPropagation()
            }
          }}
          onPointerDownCapture={(e) => {
            if (insideDialog) e.stopPropagation()
          }}
        />
      </Popover.Trigger>

      <Popover.Content
        className="z-50 w-auto rounded-lg border border-gray-6 bg-white p-0 shadow-lg"
        sideOffset={4}
        onPointerDownCapture={(e) => {
          if (insideDialog) e.stopPropagation()
        }}
      >
        <BaseColorPicker
          onColorSelect={handleColorSelect}
          colorType={
            colorType === "monochromatic-shades-only" 
              ? "monochromatic-shades-only" 
              : colorType === "monochromatic" 
                ? "base" 
                : colorType === "all"
                  ? "base" // Show base colors when not in monochromatic mode
                  : colorType
          }
          activeColor={normalizeToHex(color)}
          selectedBaseColor={baseColor}
        />
      </Popover.Content>
    </Popover.Root>
  )
}

export default ColorPicker
