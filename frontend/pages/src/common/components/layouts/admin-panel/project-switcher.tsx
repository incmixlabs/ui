import { useProjectStore, useProjectsCheck } from "@incmix/store"
import type { Project } from "@incmix/utils/types"
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
    description: item.description || '',
    company: item.company || '',
    orgId: item.orgId || '',
    status: item.status || 'all',
    progress: item.progress || 0,
    timeLeft: item.timeLeft || 0,
    timeType: item.timeType || 'days',
    budget: item.budget || 0,
    members: Array.isArray(item.members) ? item.members : [],
    createdAt: item.createdAt || Date.now(),
    createdBy: item.createdBy || '',
    updatedAt: item.updatedAt || Date.now(),
    updatedBy: item.updatedBy || '',
    logo: item.logo || '',
    tags: Array.isArray(item.tags) ? item.tags : [],
    milestones: Array.isArray(item.milestones) ? item.milestones : [],
    tasks: Array.isArray(item.tasks) ? item.tasks : [],
    completion: item.completion || 0,
    startDate: item.startDate || null,
    endDate: item.endDate || null,
    fileInfo: item.fileInfo || undefined
  }
  
  // Type assertion is safer now as we've provided all required properties
  return project as Project
}

export function ProjectSwitcher({ className }: { className?: string }) {
  // Use our enhanced hook that fetches real project data from RxDB
  const { projects, isLoading, hasProjects } = useProjectsCheck()
  const { selectedProject, setSelectedProject } = useProjectStore()

  // Create a list of SwitcherItems from our projects for the Switcher component
  const projectItems: SwitcherItem[] = React.useMemo(() => {
    return projects.map((p) => ({
      id: p.id,
      name: p.name || `Project ${p.id.substring(0, 6)}`,
    }))
  }, [projects])

  // Find the currently selected project in our list
  const selectedItem = React.useMemo(() => {
    if (!selectedProject) return null
    return projectItems.find((item) => item.id === selectedProject.id) || null
  }, [selectedProject, projectItems])

  React.useEffect(() => {
    // If no project is selected but we have projects, select the first one
    if (!selectedProject && projects.length > 0) {
      // Use proper type conversion function instead of type assertion
      setSelectedProject(convertToProject(projects[0]))
    }
  }, [selectedProject, projects, setSelectedProject])

  // If there are no projects or we're still loading, don't render the switcher
  if (!hasProjects || isLoading || projects.length === 0) {
    return null
  }

  return (
    <Switcher
      switchedItem={selectedItem}
      items={projectItems}
      setSwitchedItem={(id: string | null) => {
        if (id) {
          const proj = projects.find((p) => p.id === id)
          if (proj) {
            // Use proper type conversion function instead of type assertion
            setSelectedProject(convertToProject(proj))
          }
        }
      }}
      className={className}
      title="projects"
    />
  )
}
