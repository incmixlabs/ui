import { Box, Text } from "@/components/base"
import type { Project } from "@/types"
import { getColorClass } from "../../project-utils"

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

  return (
    <Box className={`${compact ? "" : "py-2"}`}>
      <Box className="mb-1 flex items-center justify-between">
        {showDetails && (
          <Text as={"span"} className="font-medium ">
            {project.name}
          </Text>
        )}
        <Text as={"span"} className="font-medium">
          {progress}%
        </Text>
      </Box>
      <Box className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
        <Box
          className={`h-full rounded-full ${baseColor}`}
          style={{ width: `${progress}%` }}
        />
      </Box>
    </Box>
  )
}
