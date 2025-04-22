import { create } from "zustand"
import { persist } from "zustand/middleware"

export type TProject = {
  id: string
  name: string
}

type DashboardStore = {
  projects: TProject[]
  addProject: (name: string) => TProject
  getProjectById: (id: string) => TProject | undefined
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      projects: [],
      addProject: (name) => {
        const id = `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`
        const newProject = { id, name }
        set((state) => ({
          projects: [...state.projects, newProject],
        }))
        return newProject
      },
      getProjectById: (id) => get().projects.find((p) => p.id === id),
    }),
    {
      name: "dashboard-storage",
    }
  )
)
