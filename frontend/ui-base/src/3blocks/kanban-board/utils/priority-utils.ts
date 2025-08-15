/**
 * Shared utility functions for priority-related operations in Kanban board components.
 * This prevents code duplication between task-card.tsx and inline-add-task-card.tsx.
 */

export type PriorityLabel = {
  id: string
  name: string
  color: string
  type: string
}

// Color mappings for priority styling using Radix UI tokens
const PRIORITY_COLOR_MAP = {
  red: "bg-red-3 text-red-11",
  orange: "bg-orange-3 text-orange-11",
  yellow: "bg-yellow-3 text-yellow-11",
  green: "bg-green-3 text-green-11",
  blue: "bg-blue-3 text-blue-11",
  purple: "bg-purple-3 text-purple-11",
} as const

// Priority ID mappings for fallback styling
const PRIORITY_ID_MAP = {
  urgent: "bg-red-3 text-red-11",
  high: "bg-red-3 text-red-11",
  medium: "bg-orange-3 text-orange-11",
  low: "bg-blue-3 text-blue-11",
} as const

// Default styling when no match is found
const DEFAULT_PRIORITY_STYLE = "bg-gray-3 text-gray-11"

/**
 * Get CSS class names for priority styling based on priority ID and labels.
 * Returns appropriate Radix UI color token classes that work for both light and dark themes.
 *
 * @param priorityId - The priority identifier
 * @param priorityLabels - Optional array of priority label objects with color information
 * @returns CSS class names string for styling the priority badge
 */
export const getPriorityStyles = (
  priorityId: string,
  priorityLabels?: PriorityLabel[]
): string => {
  // If priorityLabels exists, try to get color from it
  if (priorityLabels && priorityLabels.length > 0) {
    const priority = priorityLabels.find((p) => p.id === priorityId)
    if (priority?.color) {
      return (
        PRIORITY_COLOR_MAP[
          priority.color.toLowerCase() as keyof typeof PRIORITY_COLOR_MAP
        ] || DEFAULT_PRIORITY_STYLE
      )
    }
  }

  // Fallback to using priorityId directly
  return (
    PRIORITY_ID_MAP[priorityId.toLowerCase() as keyof typeof PRIORITY_ID_MAP] ||
    DEFAULT_PRIORITY_STYLE
  )
}

/**
 * Get human-readable priority name from priority ID and labels.
 *
 * @param priorityId - The priority identifier
 * @param priorityLabels - Optional array of priority label objects
 * @returns Human-readable priority name
 */
export const getPriorityName = (
  priorityId: string,
  priorityLabels?: PriorityLabel[]
): string => {
  // First try to get from priorityLabels if available
  if (priorityLabels && priorityLabels.length > 0) {
    const priority = priorityLabels.find((p) => p.id === priorityId)
    if (priority?.name) return priority.name
  }

  // Fallback to formatting the priorityId directly
  if (!priorityId) return ""

  // Capitalize first letter and format the rest
  return priorityId.charAt(0).toUpperCase() + priorityId.slice(1).toLowerCase()
}
