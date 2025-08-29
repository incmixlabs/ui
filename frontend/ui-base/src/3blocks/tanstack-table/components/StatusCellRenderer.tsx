import {
  adjustColorBrightness,
  getContrastingTextColor,
  normalizeToHex,
} from "@incmix/store/color"
import type { DropdownOption } from "../cell-renderers"

interface StatusCellRendererProps {
  value: string
  options?: DropdownOption[]
  displayStyle?: "badge" | "full-cell"
  className?: string
}

/**
 * Reusable status cell renderer that supports both badge and full-cell display styles
 */
export const StatusCellRenderer: React.FC<StatusCellRendererProps> = ({
  value,
  options = [],
  displayStyle = "badge",
  className = "",
}) => {
  // Find the selected option by value
  const option = options.find((opt: DropdownOption) => opt.value === value)

  // If no matching option is found, use a fallback
  const displayOption = option || {
    value,
    label: value,
    color: "#e5e7eb",
  }

  const backgroundColor = displayOption.color || "#e5e7eb"
  // Resolve CSS variables to hex before passing to color math functions
  const normalizedBackgroundColor = normalizeToHex(backgroundColor)
  const textColor = getContrastingTextColor(normalizedBackgroundColor)
  const borderColor = adjustColorBrightness(normalizedBackgroundColor, -20)

  if (displayStyle === "full-cell") {
    return (
      <span
        className={`font-medium text-sm capitalize ${className}`}
        style={{ color: textColor }}
      >
        {displayOption.label}
      </span>
    )
  }

  // Default badge style
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs capitalize ring-1 ring-inset ${className}`}
      style={{
        backgroundColor,
        color: textColor,
        borderColor,
      }}
    >
      {displayOption.label}
    </span>
  )
}

export default StatusCellRenderer
