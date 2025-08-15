// components/board/priority-config.ts - Shared priority configuration
// Updated to support dynamic priority labels from the database

import { AlertCircle, Clock, Flag } from "lucide-react"

export interface PriorityInfo {
  color: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
}

/**
 * Interface for priority labels used throughout the application
 */
export interface PriorityLabel {
  id: string
  name: string
  color?: string
  type?: string
  order?: number
}

/**
 * Get priority info from priority labels array
 * @param priorityId - The ID of the priority to get info for
 * @param priorityLabels - Array of priority labels from the hooks
 * @returns Priority info with color, icon and label
 */
export function getPriorityConfig(
  priorityId?: string,
  priorityLabels?: PriorityLabel[]
): PriorityInfo {
  // First try to find the priority in the provided labels
  if (priorityLabels?.length && priorityId) {
    const matchedLabel = priorityLabels.find((label) => label.id === priorityId)
    if (matchedLabel) {
      // Determine appropriate icon based on priority name/color
      let icon = Clock // Default icon

      // Map icons based on priority name patterns
      const name = matchedLabel.name.toLowerCase()
      if (name.includes("urgent") || name.includes("critical")) {
        icon = AlertCircle
      } else if (name.includes("high")) {
        icon = Flag
      } else if (name.includes("medium") || name.includes("normal")) {
        icon = Clock
      } else {
        icon = Clock
      }

      return {
        color: matchedLabel.color || "gray",
        icon,
        label: matchedLabel.name,
      }
    }
  }

  // If we get here, the priority ID wasn't found in the labels array
  // Look for a default/medium priority in the labels
  if (priorityLabels?.length) {
    const defaultPriority = priorityLabels.find((label) => {
      const lowerName = label.name.toLowerCase()
      return lowerName.includes("medium") || lowerName.includes("normal")
    })

    if (defaultPriority) {
      return {
        color: defaultPriority.color || "gray",
        icon: Clock,
        label: defaultPriority.name,
      }
    }

    // If there are any priority labels, use the first one as fallback
    return {
      color: priorityLabels[0].color || "gray",
      icon: Clock,
      label: priorityLabels[0].name,
    }
  }

  // Final fallback to legacy behavior for backward compatibility
  return getPriorityInfo(priorityId)
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use getPriorityConfig instead which works with dynamic labels
 */
export function getPriorityInfo(priority?: string): PriorityInfo {
  switch (priority) {
    case "urgent":
      return {
        color: "red",
        icon: AlertCircle,
        label: "Urgent",
      }
    case "high":
      return {
        color: "orange",
        icon: Flag,
        label: "High",
      }
    case "medium":
      return {
        color: "blue",
        icon: Clock,
        label: "Medium",
      }
    case "low":
      return {
        color: "gray",
        icon: Clock,
        label: "Low",
      }
    default:
      return {
        color: "blue",
        icon: Clock,
        label: "Medium",
      }
  }
}
