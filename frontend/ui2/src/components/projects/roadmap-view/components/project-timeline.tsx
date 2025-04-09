import { Box, Flex, Heading, Text } from "@/components"
import { formatDate } from "@/lib/utils/date"
import type { Project } from "@/types"
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { DateTime } from "luxon"
import { getColorClass, getLightColorClass } from "../../project-utils"
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

  return (
    <Box className="space-y-4">
      <Box className="relative pt-6">
        {/* Timeline bar */}
        <Box className="h-3 overflow-hidden rounded-full bg-gray-200">
          <Box
            className={`h-full ${baseColor}`}
            style={{ width: `${progress}%` }}
          />
        </Box>

        {/* Start date marker */}
        <Box className="-translate-x-1/2 absolute top-0 left-0 transform">
          <Box className="h-3 w-3 rounded-full bg-gray-400" />
          <Box className="mt-1 whitespace-nowrap text-gray-500 text-xs">
            {formatDate(startDate)}
          </Box>
        </Box>

        {/* End date marker */}
        <Box className="absolute top-0 right-0 translate-x-1/2 transform">
          <Box className="h-3 w-3 rounded-full bg-gray-400" />
          <Box className="mt-1 whitespace-nowrap text-gray-500 text-xs">
            {formatDate(endDate)}
          </Box>
        </Box>

        {/* Today marker (only if within range) */}
        {isTodayInRange && (
          <Box
            className="-translate-x-1/2 absolute top-0 transform"
            style={{ left: `${todayPosition}%` }}
          >
            <Box className="h-3 w-3 rounded-full bg-blue-500" />
            <Box className="mt-1 whitespace-nowrap text-blue-500 text-xs">
              Today
            </Box>
          </Box>
        )}
      </Box>

      {detailed && project.subProjects && project.subProjects.length > 0 && (
        <Box className="mt-8 space-y-6">
          <Heading className="font-medium text-lg">
            Sub-Projects Timeline
          </Heading>
          <Box className="space-y-6">
            {project.subProjects.map((subProject) => (
              <Box key={subProject.id} className="space-y-2">
                <Flex align={"center"} justify={"between"}>
                  <Heading className="font-medium">{subProject.name}</Heading>
                  <Text as={"span"} className="text-gray-500 text-sm">
                    {subProject.progress}%
                  </Text>
                </Flex>
                <Box className="relative h-8 overflow-hidden rounded-md bg-gray-100">
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
                      <Box
                        className={`absolute h-full ${subLightColor} flex items-center px-2`}
                        style={{
                          left: `${startPercent}%`,
                          width: `${widthPercent}%`,
                        }}
                      >
                        <Box
                          className={`h-full ${subBaseColor}`}
                          style={{ width: `${subProject.progress}%` }}
                        />
                        <Text className="absolute ml-2 max-w-[90%] truncate font-medium text-white text-xs">
                          {subProject.name}
                        </Text>
                      </Box>
                    )
                  })()}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
