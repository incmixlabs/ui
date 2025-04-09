import { useMediaQuery } from "@hooks/use-media-query"
import { Box, Flex } from "@incmix/ui"
import { cn } from "@utils"
import type { ElementType } from "react"
import type { FileItem } from "../data"
import { ProjectActionsMenu } from "./project-actions-menu"

interface ProjectCardProps {
  file: FileItem
  onClick: () => void
  viewMode: "grid" | "list" | "side"
  isSelected?: boolean
}

export default function ProjectCard({
  file,
  onClick,
  viewMode,
  isSelected = false,
}: ProjectCardProps) {
  const isTabet = useMediaQuery("(min-width: 768px)")

  const IconComponent: ElementType | undefined = isSelected
    ? file.openIcon
    : file.closeIcon
  return (
    <Box
      className={cn(
        "group aspect relative cursor-pointer overflow-hidden rounded-md border border-gray-5 hover:border-sidebar-secondary-active/30 hover:bg-sidebar-secondary-active/5 md:border-gray-1",
        viewMode === "grid"
          ? "flex flex-col items-center py-10 "
          : "flex items-center p-3 ",
        isSelected &&
          "border border-sidebar-secondary-active/30 bg-sidebar-secondary-active/5"
      )}
      onClick={onClick}
    >
      <Box
        className={`
          ${viewMode === "grid" ? "flex flex-col items-center" : "flex items-center gap-3"}
          ${viewMode === "grid" ? "w-full" : "flex-1"}
        `}
      >
        <Box className={`${viewMode === "grid" ? "mb-3" : ""}`}>
          {IconComponent && (
            <IconComponent
              className={`${
                file.type === "folder" ? "" : "text-gray-500"
              } ${viewMode === "grid" ? "h-16 w-16" : "h-10 w-10"}`}
            />
          )}
        </Box>

        <Box className={`${viewMode === "grid" ? "text-center" : "flex-1"}`}>
          <h3
            className={cn(
              "truncate font-medium",
              viewMode === "grid" ? "text-center" : ""
            )}
          >
            {file.name}
          </h3>
          {viewMode === "list" && (
            <Flex
              align={"center"}
              gap={"4"}
              className="text-muted-foreground text-sm "
            >
              <span>{file.modified}</span>
              <span>
                {file.size.value} {file.size.unit}
              </span>
            </Flex>
          )}
          {viewMode === "grid" && (
            <Flex
              align={"center"}
              justify={"center"}
              gap={"4"}
              className="mt-1 text-muted-foreground text-sm"
            >
              {file.size.value} {file.size.unit}
            </Flex>
          )}
        </Box>
      </Box>
      {isTabet && (
        <Box
          className="absolute top-3 right-5 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <ProjectActionsMenu
            projectId={file.id}
            className="h-6 w-6 cursor-pointer bg-sidebar-secondary-active/20 dark:bg-sidebar-secondary-active/20 dark:text-white "
          />
        </Box>
      )}
    </Box>
  )
}
