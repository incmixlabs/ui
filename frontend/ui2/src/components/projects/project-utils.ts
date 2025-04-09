import type { Project } from "@/types"

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
