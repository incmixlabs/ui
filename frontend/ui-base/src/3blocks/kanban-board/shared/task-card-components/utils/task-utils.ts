// task-card-components/utils/task-utils.ts
import { AlertCircle, Clock, Flag } from "lucide-react"
import { MOCK_MEMBERS } from "../../../constants/mock-members"
import type { Member, PriorityConfig } from "./types"

export const getPriorityConfig = (priorityId?: string): PriorityConfig => {
  switch (priorityId) {
    case "urgent":
      return {
        color: "red" as const,
        icon: AlertCircle,
        label: "Urgent",
        bgColor: "bg-red-50 dark:bg-red-950/20",
        textColor: "text-red-700 dark:text-red-400",
      }
    case "high":
      return {
        color: "orange" as const,
        icon: Flag,
        label: "High",
        bgColor: "bg-orange-50 dark:bg-orange-950/20",
        textColor: "text-orange-700 dark:text-orange-400",
      }
    case "medium":
      return {
        color: "blue" as const,
        icon: Clock,
        label: "Medium",
        bgColor: "bg-blue-50 dark:bg-blue-950/20",
        textColor: "text-blue-700 dark:text-blue-400",
      }
    case "low":
      return {
        color: "gray" as const,
        icon: Clock,
        label: "Low",
        bgColor: "bg-gray-50 dark:bg-gray-950/20",
        textColor: "text-gray-700 dark:text-gray-400",
      }
    default:
      return {
        color: "blue" as const,
        icon: Clock,
        label: "Medium",
        bgColor: "bg-blue-50 dark:bg-blue-950/20",
        textColor: "text-blue-700 dark:text-blue-400",
      }
  }
}

export const formatDate = (date: string | null | undefined): string => {
  if (!date) return "Not set"
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export const isTaskOverdue = (task: {
  endDate?: number | string
  completed: boolean
}): boolean => {
  if (!task.endDate) return false
  // Handle both number timestamp and string date format
  const endDate =
    typeof task.endDate === "number"
      ? new Date(task.endDate)
      : new Date(task.endDate)
  return endDate < new Date() && !task.completed
}

export const calculateSubtaskProgress = (
  subtasks: { completed: boolean }[] = []
) => {
  const completedSubTasks = subtasks.filter((st) => st.completed).length
  const totalSubTasks = subtasks.length
  const progressPercentage =
    totalSubTasks > 0 ? (completedSubTasks / totalSubTasks) * 100 : 0

  return {
    completedSubTasks,
    totalSubTasks,
    progressPercentage,
  }
}

// Re-export members from centralized location for backward compatibility
export const members: Member[] = MOCK_MEMBERS
