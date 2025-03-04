import type { Project } from "@components/projects/types"
import { create } from "zustand"

interface ProjectDrawerStore {
  isOpen: boolean
  project: Project | null
  onOpen: (project: Project) => void
  onClose: () => void
}

export const useProjectDrawer = create<ProjectDrawerStore>((set) => ({
  isOpen: false,
  project: null,
  onOpen: (project) => set({ isOpen: true, project }),
  onClose: () => set({ isOpen: false, project: null }),
}))
