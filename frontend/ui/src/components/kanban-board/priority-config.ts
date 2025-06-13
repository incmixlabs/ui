// components/board/priority-config.ts - Shared priority configuration

import { AlertCircle, Clock, Flag } from "lucide-react"

export interface PriorityInfo {
  color: "red" | "orange" | "blue" | "gray"
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
}

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