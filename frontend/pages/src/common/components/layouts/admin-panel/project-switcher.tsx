import { useProjectStore, useProjectsCheck } from "@incmix/store"
import type { Project } from "@incmix/utils/types"
import * as React from "react"
import { Switcher, type SwitcherItem } from "./switcher"

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
      // Use type assertion because we know the DB project format is compatible with Project
      setSelectedProject(projects[0] as unknown as Project)
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
            // Use type assertion because we know the DB project format is compatible with Project
            setSelectedProject(proj as unknown as Project)
          }
        }
      }}
      className={className}
      title="projects"
    />
  )
}
