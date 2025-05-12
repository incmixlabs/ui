import type { Layout } from "react-grid-layout"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Breakpoint = "lg" | "md" | "sm" | "xs" | "xxs"

export interface DashboardTemplate {
  id: string
  name: string
  projectId: string
  tags: string[]
  layouts: Record<Breakpoint, Layout[]>
  nestedLayouts: Record<string, Layout[]>
  createdAt: number
  updatedAt: number
}

interface TemplateState {
  templates: DashboardTemplate[]
  addTemplate: (
    template: Omit<DashboardTemplate, "id" | "createdAt" | "updatedAt">
  ) => void
  updateTemplate: (id: string, template: Partial<DashboardTemplate>) => void
  deleteTemplate: (id: string) => void
  getTemplatesByProjectId: (projectId: string) => DashboardTemplate[]
  getTemplatesByTag: (tag: string) => DashboardTemplate[]
  getTemplateById: (id: string) => DashboardTemplate | undefined
}

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set, get) => ({
      templates: [],

      addTemplate: (template) => {
        const id = `template-${Date.now()}`
        const now = Date.now()

        set((state) => ({
          templates: [
            ...state.templates,
            {
              ...template,
              id,
              createdAt: now,
              updatedAt: now,
            },
          ],
        }))

        return id
      },

      updateTemplate: (id, template) => {
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === id
              ? {
                  ...t,
                  ...template,
                  updatedAt: Date.now(),
                }
              : t
          ),
        }))
      },

      deleteTemplate: (id) => {
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== id),
        }))
      },

      getTemplatesByProjectId: (projectId) => {
        return get().templates.filter((t) => t.projectId === projectId)
      },

      getTemplatesByTag: (tag) => {
        return get().templates.filter((t) => t.tags.includes(tag))
      },

      getTemplateById: (id) => {
        return get().templates.find((t) => t.id === id)
      },
    }),
    {
      name: "dashboard-templates",
    }
  )
)
