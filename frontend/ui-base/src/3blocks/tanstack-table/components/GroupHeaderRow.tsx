"use client"

import { ChevronRight } from "lucide-react"
import { memo } from "react"

import { Badge, Box, Checkbox, Flex, IconButton, Text } from "@/src/1base"
import { Table } from "@/src/1base/shadcn/table"

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
  // Color prop for dynamic styling
  color?: string
  // Category mapping from parent to get labels and colors
  categoryMapping?: {
    valueToIdentifier?: Record<string, string>
    identifierToLabel?: Record<string, string>
    colors?: Record<string, string>
  }
}

// Get display label from category mapping or fallback to groupKey
const getDisplayLabel = (
  groupKey: string,
  categoryMapping?: {
    identifierToLabel?: Record<string, string>
  }
): string => {
  return categoryMapping?.identifierToLabel?.[groupKey] || groupKey
}

// Get color from category mapping or use provided color
const getGroupColor = (
  groupKey: string,
  categoryMapping?: {
    colors?: Record<string, string>
  },
  fallbackColor?: string
): string => {
  return categoryMapping?.colors?.[groupKey] || fallbackColor || "#6b7280"
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
  color,
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

  // Get display label and color from category mapping
  const displayLabel = getDisplayLabel(groupKey, categoryMapping)
  const groupColor = getGroupColor(groupKey, categoryMapping, color)

  return (
    <Table.Row
      className="group-header h-10 cursor-pointer border-b-0 hover:opacity-90"
      onClick={handleToggleClick}
      aria-expanded={!isCollapsed}
      data-state={isCollapsed ? "collapsed" : "expanded"}
    >
      <Table.Cell colSpan={colSpan} className="p-0">
        {renderGroupHeader ? (
          // Use custom renderer if provided
          renderGroupHeader(groupKey, rowCount)
        ) : (
          // Default rendering using 1base components
          <Box height="10">
            <Flex
              align="center"
              justify="between"
              px="3"
              height="10"
              width="100%"
            >
              {/* Left section: checkbox, bullet, text, count */}
              <Flex align="center" gap="2">
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
                  />
                )}

                {/* Bullet indicator */}
                <Box
                  width="6px"
                  height="6px"
                  className="rounded-full"
                  style={{ backgroundColor: groupColor }}
                />

                {/* Status text */}
                <Text size="2" weight="medium">
                  {displayLabel}
                </Text>

                {/* Count */}
                <Text size="2" color="gray">
                  {rowCount}
                </Text>
              </Flex>

              {/* Right section: Expand/collapse icon */}
              <IconButton
                variant="ghost"
                size="1"
                className={`transition-transform duration-200 ease-in-out ${
                  isCollapsed ? "" : "rotate-90"
                }`}
                aria-label={isCollapsed ? "Expand group" : "Collapse group"}
              >
                <ChevronRight />
              </IconButton>
            </Flex>
          </Box>
        )}
      </Table.Cell>
    </Table.Row>
  )
}

// Export memoized version for better performance
export const GroupHeaderRow = memo(GroupHeaderRowComponent)
