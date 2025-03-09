import type { Project } from "@types"
import { getColorClass, getLightColorClass } from "./project-utils"

interface ProjectProgressBarProps {
  project: Project
  compact?: boolean
  showDetails?: boolean
}

export function ProjectProgressBar({
  project,
  compact = false,
  showDetails = false,
}: ProjectProgressBarProps) {
  const { progress, color } = project
  const baseColor = getColorClass(color)
  const _lightColor = getLightColorClass(color)

  return (
    <div className={`${compact ? "" : "py-2"}`}>
      <div className="mb-1 flex items-center justify-between">
        {showDetails && (
          <div className="font-medium text-sm">{project.name}</div>
        )}
        <div className="font-medium text-sm">{progress}%</div>
      </div>
      <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full ${baseColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
