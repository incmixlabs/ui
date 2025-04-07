import type { Project } from "@types"
import { DateTime } from "luxon"

export function formatDate(date: DateTime): string {
  return date.toFormat("MMM d, yyyy")
}

export function calculateDaysRemaining(endDate: DateTime): number {
  const today = DateTime.now()
  const diff = endDate.diff(today, "days").days
  return Math.max(0, Math.ceil(diff))
}

export function calculateDaysElapsed(startDate: DateTime): number {
  const today = DateTime.now()
  const diff = today.diff(startDate, "days").days
  return Math.ceil(diff)
}

export function calculateTotalDuration(
  startDate: DateTime,
  endDate: DateTime
): number {
  const diff = endDate.diff(startDate, "days").days
  return Math.max(0, Math.ceil(diff))
}

export function calculateProgressPercentage(
  startDate: DateTime,
  endDate: DateTime
): number {
  const totalDuration = calculateTotalDuration(startDate, endDate)

  // Handle invalid date ranges
  if (totalDuration <= 0) {
    return 0 // Return 0% progress for invalid date ranges
  }

  // If start date is in the future, progress is 0%
  if (startDate > DateTime.now()) {
    return 0
  }

  const daysElapsed = calculateDaysElapsed(startDate)

  // Cap at 100%
  return Math.min(Math.round((daysElapsed / totalDuration) * 100), 100)
}

export function calculateAverageProgress(projects: Project[]): number {
  if (projects.length === 0) return 0

  const totalProgress = projects.reduce(
    (sum, project) => sum + project.progress,
    0
  )
  return Math.round(totalProgress / projects.length)
}

export function getColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    green: "bg-emerald-500",
    lightGreen: "bg-emerald-300",
    blue: "bg-blue-500",
    lightBlue: "bg-blue-300",
    red: "bg-red-500",
    lightRed: "bg-red-300",
    orange: "bg-orange-500",
    lightOrange: "bg-orange-300",
    purple: "bg-purple-500",
    lightPurple: "bg-purple-300",
  }

  return colorMap[color] || "bg-gray-500"
}

export function getLightColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    green: "bg-emerald-300",
    lightGreen: "bg-emerald-200",
    blue: "bg-blue-300",
    lightBlue: "bg-blue-200",
    red: "bg-red-300",
    lightRed: "bg-red-200",
    orange: "bg-orange-300",
    lightOrange: "bg-orange-200",
    purple: "bg-purple-300",
    lightPurple: "bg-purple-200",
  }

  return colorMap[color] || "bg-gray-300"
}
