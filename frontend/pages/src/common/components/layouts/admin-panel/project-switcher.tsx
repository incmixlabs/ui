import { useProjectStore, useProjectsCheck } from "@incmix/store"
import type { Project } from "@incmix/utils/types"
import { BadgeAlert } from "lucide-react"
import * as React from "react"
import { Switcher, type SwitcherItem } from "./switcher"

/**
 * Convert from database project format to Project type expected by project store
 * This ensures type safety instead of using unsafe type assertions
 */
function convertToProject(item: any): Project {
  // Create a properly typed Project object from the database format
  // with default values for any missing properties
  const project = {
    id: item.id,
    name: item.name || `Project ${item.id.substring(0, 6)}`,
    title: item.title || item.name || `Project ${item.id.substring(0, 6)}`,
    description: item.description || "",
    company: item.company || "",
    orgId: item.orgId || "",
    status: item.status || "all",
    progress: item.progress || 0,
    timeLeft: item.timeLeft || 0,
    timeType: item.timeType || "days",
    budget: item.budget || 0,
    members: Array.isArray(item.members) ? item.members : [],
    createdAt: item.createdAt || Date.now(),
    createdBy: item.createdBy || "",
    updatedAt: item.updatedAt || Date.now(),
    updatedBy: item.updatedBy || "",
    logo: item.logo || "",
    tags: Array.isArray(item.tags) ? item.tags : [],
    milestones: Array.isArray(item.milestones) ? item.milestones : [],
    tasks: Array.isArray(item.tasks) ? item.tasks : [],
    completion: item.completion || 0,
    startDate: item.startDate || null,
    endDate: item.endDate || null,
    fileInfo: item.fileInfo || undefined,
  }

  // Type assertion is safer now as we've provided all required properties
  return project as Project
}

export function ProjectSwitcher({ className }: { className?: string }) {
  // Use our enhanced hook that fetches real project data from RxDB filtered by organization
  const { projects, isLoading, hasProjects } = useProjectsCheck()
  const { selectedProject, setSelectedProject } = useProjectStore()

  // More detailed logging to help diagnose any issues
  console.log("ProjectSwitcher rendering:", {
    projects: projects?.length || 0,
    projectIds: projects.map((p) => p.id).join(", "),
    hasProjects,
    isLoading,
    selectedProject: selectedProject?.id || "none",
    selectedProjectTitle: selectedProject?.title || "none",
  })

  // Create a list of SwitcherItems from our projects for the Switcher component
  const projectItems: SwitcherItem[] = React.useMemo(() => {
    return projects.map((p) => ({
      id: p.id,
      name: p.name || `Project ${p.id.substring(0, 6)}`,
    }))
  }, [projects])

  // Find the currently selected project in our list
  const handleProjectSelect = (id: string | null) => {
    if (id) {
      const proj = projects.find((p) => p.id === id)
      if (proj) {
        // Use proper type conversion function instead of type assertion
        setSelectedProject(convertToProject(proj))
      }
    }
  }

  // Show a message if projects are loading
  if (isLoading) {
    return (
      <div className="px-2 py-1 text-[var(--sidebar-foreground)] text-xs">
        Loading projects...
      </div>
    )
  }

  // If there are no projects after filtering by organization ID, show a helpful message
  if (!hasProjects || projects.length === 0) {
    return (
      <div className="flex items-center gap-2 px-0 py-2 text-[var(--sidebar-foreground)] text-xs group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:text-gray-12">
        <BadgeAlert size={16} /> No projects found
      </div>
    )
  }

  return (
    <Switcher
      switchedItem={
        projectItems.find((item) => item.id === selectedProject?.id) || null
      }
      items={projectItems}
      setSwitchedItem={handleProjectSelect}
      className={className}
      title="Projects"
    />
  )
}
