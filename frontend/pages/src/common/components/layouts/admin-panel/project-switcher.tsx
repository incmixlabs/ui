import * as React from "react"

import { useProjectStore } from "@incmix/store"
import { useProjects } from "../../../../projects/utils"
import { Switcher, type SwitcherItem } from "./switcher"

export function ProjectSwitcher() {
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  const { projects, isLoading } = useProjects()
  const { selectedProject, setSelectedProject } = useProjectStore()

  React.useEffect(() => {
    if (!selectedProject && projects?.[0]) {
      setSelectedProject(projects[0])
    }
    // No JSX or setSwitchedItem assignment here
  }, [selectedProject, projects, setSelectedProject])

  return (
    <Switcher
      switchedItem={selectedProject as SwitcherItem | null}
      items={projects as SwitcherItem[]}
      setSwitchedItem={(id: string | null) => {
        const proj = projects.find((o) => o.id === id) || null
        if (proj) {
          setSelectedProject(proj)
        }
      }}
      title="projects"
    />
  )
}
