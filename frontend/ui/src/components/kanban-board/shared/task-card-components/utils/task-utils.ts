// task-card-components/utils/task-utils.ts
import { AlertCircle, Flag, Clock } from "lucide-react"
import type { PriorityConfig, Member } from "./types"

export const getPriorityConfig = (priority?: string): PriorityConfig => {
  switch (priority) {
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
    year: "numeric"
  })
}

export const isTaskOverdue = (task: { endDate?: string; completed: boolean }): boolean => {
  return !!(task.endDate && new Date(task.endDate) < new Date() && !task.completed)
}

export const calculateSubtaskProgress = (subtasks: { completed: boolean }[] = []) => {
  const completedSubTasks = subtasks.filter(st => st.completed).length
  const totalSubTasks = subtasks.length
  const progressPercentage = totalSubTasks > 0 ? (completedSubTasks / totalSubTasks) * 100 : 0
  
  return {
    completedSubTasks,
    totalSubTasks,
    progressPercentage
  }
}

// Hard-coded members data - could be moved to a config file or API call
export const members: Member[] = [
  {
    id: "1",
    value: "shane-black",
    name: "Shane Black",
    label: "Shane Black",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    position: "UI/UX Designer",
    color: "blue",
  },
  {
    id: "2",
    value: "john-doe",
    name: "John Doe", 
    label: "John Doe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    position: "Project Manager",
    color: "amber",
  },
  {
    id: "3",
    value: "jane-smith",
    name: "Jane Smith",
    label: "Jane Smith", 
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b589?w=32&h=32&fit=crop&crop=face",
    position: "Business Analyst",
    color: "indigo",
  },
  {
    id: "4",
    value: "emily-johnson",
    name: "Emily Johnson",
    label: "Emily Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    color: "cyan",
    position: "Web Developer",
  },
  {
    id: "5",
    value: "micheal-brown",
    label: "Michael Brown",
    name: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    position: "Product Designer", 
    color: "orange",
  },
]