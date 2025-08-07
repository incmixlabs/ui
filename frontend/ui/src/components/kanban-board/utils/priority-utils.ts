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

/**
 * Get CSS class names for priority styling based on priority ID and labels.
 * Returns appropriate Radix UI color token classes for both light and dark themes.
 * 
 * @param priorityId - The priority identifier
 * @param priorityLabels - Optional array of priority label objects with color information
 * @returns CSS class names string for styling the priority badge
 */
export const getPriorityStyles = (priorityId: string, priorityLabels?: PriorityLabel[]): string => {
  // If priorityLabels exists, try to get color from it
  if (priorityLabels && priorityLabels.length > 0) {
    const priority = priorityLabels.find(p => p.id === priorityId)
    if (priority && priority.color) {
      // Convert the color to a Radix UI token class based on color value
      switch (priority.color.toLowerCase()) {
        case "red":
          return "bg-red-3 text-red-11 dark:bg-red-3 dark:text-red-11"
        case "orange":
          return "bg-orange-3 text-orange-11 dark:bg-orange-3 dark:text-orange-11"
        case "yellow":
          return "bg-yellow-3 text-yellow-11 dark:bg-yellow-3 dark:text-yellow-11"
        case "green":
          return "bg-green-3 text-green-11 dark:bg-green-3 dark:text-green-11"
        case "blue":
          return "bg-blue-3 text-blue-11 dark:bg-blue-3 dark:text-blue-11"
        case "purple":
          return "bg-purple-3 text-purple-11 dark:bg-purple-3 dark:text-purple-11"
        default:
          return "bg-gray-3 text-gray-11 dark:bg-gray-3 dark:text-gray-11"
      }
    }
  }
  
  // Fallback to using priorityId directly
  switch (priorityId.toLowerCase()) {
    case "urgent":
    case "high":
      return "bg-red-3 text-red-11 dark:bg-red-3 dark:text-red-11"
    case "medium":
      return "bg-orange-3 text-orange-11 dark:bg-orange-3 dark:text-orange-11"
    case "low":
      return "bg-blue-3 text-blue-11 dark:bg-blue-3 dark:text-blue-11"
    default:
      return "bg-gray-3 text-gray-11 dark:bg-gray-3 dark:text-gray-11"
  }
}

/**
 * Get human-readable priority name from priority ID and labels.
 * 
 * @param priorityId - The priority identifier
 * @param priorityLabels - Optional array of priority label objects
 * @returns Human-readable priority name
 */
export const getPriorityName = (priorityId: string, priorityLabels?: PriorityLabel[]): string => {
  // First try to get from priorityLabels if available
  if (priorityLabels && priorityLabels.length > 0) {
    const priority = priorityLabels.find(p => p.id === priorityId)
    if (priority?.name) return priority.name
  }
  
  // Fallback to formatting the priorityId directly
  if (!priorityId) return ""
  
  // Capitalize first letter and format the rest
  return priorityId.charAt(0).toUpperCase() + priorityId.slice(1).toLowerCase()
}
