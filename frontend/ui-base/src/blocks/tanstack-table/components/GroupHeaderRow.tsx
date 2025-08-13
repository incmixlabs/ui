"use client"

import { ChevronRight } from "lucide-react"
import { memo } from "react"

import { Checkbox } from "@/base"
import { Table } from "@/base/shadcn/table"

interface GroupHeaderRowProps {
  groupKey: string
  rowCount: number
  isCollapsed: boolean
  toggleCollapsed: (groupKey: string) => void
  colSpan: number
  // Custom render function
  renderGroupHeader?: (groupValue: string, count: number) => React.ReactNode
  // Group-specific selection props
  groupSelectProps?: {
    isAllRowsSelected: boolean
    isSomeRowsSelected: boolean
    toggleAllRowsSelected: (value: boolean) => void
  }
  // Dynamic color mapping from the parent component
  categoryMapping?: Record<
    string,
    {
      color: string // Text/accent color
      backgroundColor: string // Background color
    }
  >
}

// Define category styles mapping using standardized identifiers
// This should match your design system
const categoryStyleMap: Record<
  string,
  {
    color: string
    textColor: string
    darkTextColor: string
    bgColor: string
    darkBgColor: string
    label?: string
  }
> = {
  // Standard identifiers
  todo: {
    color: "bg-purple-500",
    textColor: "text-purple-800",
    darkTextColor: "text-purple-300",
    bgColor: "bg-purple-100",
    darkBgColor: "bg-purple-900/30",
    label: "Todo",
  },
  in_design: {
    color: "bg-violet-500",
    textColor: "text-violet-800",
    darkTextColor: "text-violet-300",
    bgColor: "bg-violet-100",
    darkBgColor: "bg-violet-900/30",
    label: "In Design",
  },
  in_review: {
    color: "bg-orange-500",
    textColor: "text-orange-800",
    darkTextColor: "text-orange-300",
    bgColor: "bg-orange-100",
    darkBgColor: "bg-orange-900/30",
    label: "In Review",
  },
  working: {
    color: "bg-blue-500",
    textColor: "text-blue-800",
    darkTextColor: "text-blue-300",
    bgColor: "bg-blue-100",
    darkBgColor: "bg-blue-900/30",
    label: "Working",
  },
  done: {
    color: "bg-green-500",
    textColor: "text-green-800",
    darkTextColor: "text-green-300",
    bgColor: "bg-green-100",
    darkBgColor: "bg-green-900/30",
    label: "Done",
  },

  // Legacy support for display values (for backward compatibility)
  Todo: {
    color: "bg-purple-500",
    textColor: "text-purple-800",
    darkTextColor: "text-purple-300",
    bgColor: "bg-purple-100",
    darkBgColor: "bg-purple-900/30",
  },
  "In Design": {
    color: "bg-violet-500",
    textColor: "text-violet-800",
    darkTextColor: "text-violet-300",
    bgColor: "bg-violet-100",
    darkBgColor: "bg-violet-900/30",
  },
  "In Review": {
    color: "bg-orange-500",
    textColor: "text-orange-800",
    darkTextColor: "text-orange-300",
    bgColor: "bg-orange-100",
    darkBgColor: "bg-orange-900/30",
  },
  Working: {
    color: "bg-blue-500",
    textColor: "text-blue-800",
    darkTextColor: "text-blue-300",
    bgColor: "bg-blue-100",
    darkBgColor: "bg-blue-900/30",
  },
  Done: {
    color: "bg-green-500",
    textColor: "text-green-800",
    darkTextColor: "text-green-300",
    bgColor: "bg-green-100",
    darkBgColor: "bg-green-900/30",
  },
}

/**
 * Component for rendering a group header row in the table that matches the design
 * in the provided screenshot with colored bullets and expand/collapse icons
 */
function GroupHeaderRowComponent({
  groupKey,
  rowCount,
  isCollapsed,
  toggleCollapsed,
  colSpan,
  renderGroupHeader,
  groupSelectProps,
  categoryMapping,
}: GroupHeaderRowProps) {
  // Handle click on the group header
  const handleToggleClick = () => {
    toggleCollapsed(groupKey)
  }

  // Prevent checkbox click from toggling group collapse
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // Check if we have dynamic mapping for this category
  const dynamicStyles = categoryMapping?.[groupKey]

  // If we have dynamic mapping, use it; otherwise fall back to the static map
  let styles: {
    color: string
    textColor: string
    darkTextColor: string
    bgColor: string
    darkBgColor: string
    label?: string
  }

  if (dynamicStyles) {
    // When using dynamic styles, we'll use inline style attributes instead of Tailwind classes
    // Just use placeholder classes here, actual styling will be done via style attributes
    styles = {
      color: "bg-transparent", // Will use style attribute instead
      textColor: "text-current", // Will use style attribute instead
      darkTextColor: "text-current", // Will use style attribute instead
      bgColor: "bg-transparent", // Will use style attribute instead
      darkBgColor: "bg-transparent", // Will use style attribute instead
    }
  } else {
    // Fallback to hardcoded styles
    styles = categoryStyleMap[groupKey] || {
      color: "bg-gray-400",
      textColor: "text-gray-600",
      darkTextColor: "text-gray-400",
      bgColor: "bg-gray-50",
      darkBgColor: "bg-gray-800/50",
    }
  }

  // Use the display label if available, otherwise use the groupKey
  const displayLabel = styles.label || groupKey

  // If we have dynamic styles, use the color directly for the bullet
  const _bulletColor = dynamicStyles ? dynamicStyles.color : styles.color

  return (
    <Table.Row
      className={
        "group-header cursor-pointer border-gray-200 border-b-0 hover:opacity-90 dark:border-gray-800"
      }
      onClick={handleToggleClick}
      aria-expanded={!isCollapsed}
      data-state={isCollapsed ? "collapsed" : "expanded"}
      style={{
        backgroundColor: dynamicStyles
          ? dynamicStyles.backgroundColor
          : undefined,
      }}
    >
      <Table.Cell colSpan={colSpan} className="relative p-0">
        {renderGroupHeader ? (
          // Use custom renderer if provided
          renderGroupHeader(groupKey, rowCount)
        ) : (
          // Default rendering
          <div className="flex h-10 w-full items-center justify-between px-3">
            {/* Left section: checkbox, bullet, name, count */}
            <div className="flex items-center">
              {/* Group-specific checkbox for row selection */}
              {groupSelectProps && (
                <Checkbox
                  checked={
                    groupSelectProps.isAllRowsSelected ||
                    (groupSelectProps.isSomeRowsSelected && "indeterminate")
                  }
                  onCheckedChange={(value) =>
                    groupSelectProps.toggleAllRowsSelected(!!value)
                  }
                  onClick={handleCheckboxClick}
                  aria-label={`Select all rows in ${displayLabel} group`}
                  className="mr-2 translate-y-[2px]"
                />
              )}

              <span
                className={"mr-2 h-2 w-2 rounded-full"}
                style={{
                  backgroundColor: dynamicStyles
                    ? dynamicStyles.color
                    : undefined,
                }}
              />

              {/* Category name */}
              <span
                className={`font-medium ${!dynamicStyles ? `${styles.textColor}dark:${styles.darkTextColor}` : ""}`}
                style={{
                  color: dynamicStyles ? dynamicStyles.color : undefined,
                }}
              >
                {displayLabel}
              </span>

              {/* Count */}
              <span className="ml-1 text-muted-foreground">{rowCount}</span>
            </div>

            {/* Right section: Only chevron icon for expand/collapse */}
            <div className="flex items-center">
              {/* Expand/collapse button with chevron icon and smooth rotation */}
              <div
                className={`transition-transform duration-200 ease-in-out ${isCollapsed ? "" : "rotate-90"}`}
              >
                <ChevronRight className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        )}
      </Table.Cell>
    </Table.Row>
  )
}

// Export memoized version for better performance
export const GroupHeaderRow = memo(GroupHeaderRowComponent)
