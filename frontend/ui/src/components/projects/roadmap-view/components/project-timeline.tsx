import type { Project } from "@types"
import { DateTime } from "luxon"
import { formatDate, getColorClass, getLightColorClass } from "./project-utils"

interface ProjectTimelineProps {
  project: Project
  detailed?: boolean
}

export function ProjectTimeline({
  project,
  detailed = false,
}: ProjectTimelineProps) {
  const now = DateTime.now()
  const { startDate, endDate, progress, color } = project

  // Calculate the position of today's marker
  const totalDays = endDate.diff(startDate, "days").days
  const elapsedDays = now.diff(startDate, "days").days
  const todayPosition = Math.min(
    Math.max((elapsedDays / totalDays) * 100, 0),
    100
  )

  // Determine if today is within the project timeline
  const isTodayInRange = now >= startDate && now <= endDate

  const baseColor = getColorClass(color)
  const _lightColor = getLightColorClass(color)

  return (
    <div className="space-y-4">
      <div className="relative pt-6">
        {/* Timeline bar */}
        <div className="h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full ${baseColor}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Start date marker */}
        <div className="-translate-x-1/2 absolute top-0 left-0 transform">
          <div className="h-3 w-3 rounded-full bg-gray-400" />
          <div className="mt-1 whitespace-nowrap text-gray-500 text-xs">
            {formatDate(startDate)}
          </div>
        </div>

        {/* End date marker */}
        <div className="absolute top-0 right-0 translate-x-1/2 transform">
          <div className="h-3 w-3 rounded-full bg-gray-400" />
          <div className="mt-1 whitespace-nowrap text-gray-500 text-xs">
            {formatDate(endDate)}
          </div>
        </div>

        {/* Today marker (only if within range) */}
        {isTodayInRange && (
          <div
            className="-translate-x-1/2 absolute top-0 transform"
            style={{ left: `${todayPosition}%` }}
          >
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <div className="mt-1 whitespace-nowrap text-blue-500 text-xs">
              Today
            </div>
          </div>
        )}
      </div>

      {detailed && project.subProjects && project.subProjects.length > 0 && (
        <div className="mt-8 space-y-6">
          <h3 className="font-medium text-lg">Sub-Projects Timeline</h3>
          <div className="space-y-6">
            {project.subProjects.map((subProject) => (
              <div key={subProject.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{subProject.name}</h4>
                  <span className="text-gray-500 text-sm">
                    {subProject.progress}%
                  </span>
                </div>
                <div className="relative h-8 overflow-hidden rounded-md bg-gray-100">
                  {/* Calculate position within parent timeline */}
                  {(() => {
                    const parentDuration = project.endDate.diff(
                      project.startDate,
                      "days"
                    ).days
                    const subStartOffset = subProject.startDate.diff(
                      project.startDate,
                      "days"
                    ).days
                    const subDuration = subProject.endDate.diff(
                      subProject.startDate,
                      "days"
                    ).days

                    const startPercent = (subStartOffset / parentDuration) * 100
                    const widthPercent = (subDuration / parentDuration) * 100

                    const subBaseColor = getColorClass(subProject.color)
                    const subLightColor = getLightColorClass(subProject.color)

                    return (
                      <div
                        className={`absolute h-full ${subLightColor} flex items-center px-2`}
                        style={{
                          left: `${startPercent}%`,
                          width: `${widthPercent}%`,
                        }}
                      >
                        <div
                          className={`h-full ${subBaseColor}`}
                          style={{ width: `${subProject.progress}%` }}
                        />
                        <span className="absolute ml-2 max-w-[90%] truncate font-medium text-white text-xs">
                          {subProject.name}
                        </span>
                      </div>
                    )
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
