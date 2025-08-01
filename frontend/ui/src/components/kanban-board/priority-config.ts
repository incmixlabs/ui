// components/board/priority-config.ts - Shared priority configuration
// Updated to support dynamic priority labels from the database

import { AlertCircle, Clock, Flag } from "lucide-react"

export interface PriorityInfo {
  color: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
}

/**
 * Get priority info from priority labels array
 * @param priorityId - The ID of the priority to get info for
 * @param priorityLabels - Array of priority labels from the hooks
 * @returns Priority info with color, icon and label
 */
export function getPriorityConfig(priorityId?: string, priorityLabels?: any[]): PriorityInfo {
  // If we have priorityLabels and a priorityId, try to find the matching label
  if (priorityLabels?.length && priorityId) {
    const matchedLabel = priorityLabels.find(label => label.id === priorityId);
    if (matchedLabel) {
      // Determine appropriate icon based on priority name/color
      let icon = Clock; // Default icon
      
      // Try to intelligently assign icons based on label name or color
      const name = matchedLabel.name.toLowerCase();
      if (name.includes("urgent") || name.includes("critical") || 
          matchedLabel.color?.includes("red") || matchedLabel.color?.includes("#f")) {
        icon = AlertCircle;
      } else if (name.includes("high") || matchedLabel.color?.includes("orange") || 
                matchedLabel.color?.includes("yellow")) {
        icon = Flag;
      }
      
      return {
        color: matchedLabel.color || "gray", 
        icon, 
        label: matchedLabel.name
      };
    }
  }
  
  // Fallback to legacy behavior for backward compatibility
  return getPriorityInfo(priorityId);
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
        label: "Urgent" 
      }
    case "high":
      return { 
        color: "orange", 
        icon: Flag, 
        label: "High" 
      }
    case "medium":
      return { 
        color: "blue", 
        icon: Clock, 
        label: "Medium" 
      }
    case "low":
      return { 
        color: "gray", 
        icon: Clock, 
        label: "Low" 
      }
    default:
      return { 
        color: "blue", 
        icon: Clock, 
        label: "Medium" 
      }
  }
}