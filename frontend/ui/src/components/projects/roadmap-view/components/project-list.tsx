"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn-dropdown"
import { Button, IconButton } from "@radix-ui/themes"
import type { Project } from "@types"
import { ChevronDown, ChevronRight, MoreVertical } from "lucide-react"
import { useState } from "react"
import { ProjectProgressBar } from "./project-progress-bar"
import { formatDate } from "./project-utils"

interface ProjectListProps {
  projects: Project[]
  onSelectProject: (project: Project) => void
}

export function ProjectList({ projects, onSelectProject }: ProjectListProps) {
  const [expandedProjects, setExpandedProjects] = useState<
    Record<string, boolean>
  >({})

  const toggleExpand = (projectId: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }))
  }

  const renderProject = (project: Project, level = 0) => {
    const isExpanded = expandedProjects[project.id]
    const hasSubProjects = project.subProjects && project.subProjects.length > 0

    return (
      <div key={project.id} className="border-b last:border-b-0">
        <div
          className={`flex items-center transition-colors hover:bg-gray-50 ${level > 0 ? "pl-8" : ""}`}
        >
          <IconButton
            variant="soft"
            className="h-8 w-8"
            onClick={() => hasSubProjects && toggleExpand(project.id)}
            disabled={!hasSubProjects}
          >
            {hasSubProjects ? (
              isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            ) : (
              <div className="w-4" />
            )}
          </IconButton>

          <div
            className="flex-1 cursor-pointer px-2 py-4"
            onClick={() => onSelectProject(project)}
          >
            <div className="font-medium">{project.name}</div>
          </div>

          <div className="flex items-center gap-4 pr-4">
            <div className="hidden text-gray-500 text-sm md:block">
              {formatDate(project.startDate)} - {formatDate(project.endDate)}
            </div>
            <div className="hidden w-48 sm:block">
              <ProjectProgressBar project={project} compact />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton variant="soft" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </IconButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onSelectProject(project)}>
                  View Details
                </DropdownMenuItem>
                {hasSubProjects && (
                  <DropdownMenuItem onClick={() => toggleExpand(project.id)}>
                    {isExpanded ? "Collapse" : "Expand"}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isExpanded && hasSubProjects && (
          <div className="border-t">
            {project.subProjects?.map((subProject) =>
              renderProject(subProject, level + 1)
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="flex items-center border-b bg-gray-50 px-4 py-2">
        <div className="w-8" />
        <div className="flex-1 font-semibold">Project Name</div>
        <div className="hidden pr-4 text-gray-500 text-sm md:block">
          Timeline
        </div>
        <div className="hidden w-48 pr-4 sm:block">Progress</div>
        <div className="w-8" />
      </div>
      <div>{projects.map((project) => renderProject(project))}</div>
    </div>
  )
}
