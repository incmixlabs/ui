import type { Project } from "@incmix/utils/schema"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface ProjectStore {
  selectedProject?: Project
  setSelectedProject: (project?: Project) => void
}

const projectStore = create<ProjectStore>()(
  persist(
    (set) => {
      return {
        setSelectedProject: (project) => set({ selectedProject: project }),
      }
    },
    {
      name: "project-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const useProjectStore = () =>
  projectStore((state) => ({
    selectedProject: state.selectedProject,
    setSelectedProject: state.setSelectedProject,
  }))
