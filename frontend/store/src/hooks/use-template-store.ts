import type { Layout } from "react-grid-layout"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { database } from "../sql/main"
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
  isActive?: boolean
}

interface TemplateState {
  templates: DashboardTemplate[]
  isLoading: boolean
  error: string | null
  initialized: boolean
  initialize: (projectId: string) => Promise<void>
  addTemplate: (
    template: Omit<DashboardTemplate, "id" | "createdAt" | "updatedAt">
  ) => Promise<string>
  updateTemplate: (
    id: string,
    template: Partial<DashboardTemplate>
  ) => Promise<void>
  deleteTemplate: (id: string) => Promise<void>
  templateActive: (id: string) => Promise<DashboardTemplate | null>
  getTemplatesByProjectId: (projectId: string) => DashboardTemplate[]
  getTemplatesByTag: (tag: string) => DashboardTemplate[]
  getTemplateById: (id: string) => Promise<DashboardTemplate | null>
  getActiveTemplate: (projectId: string) => Promise<DashboardTemplate | null>
}

export const useTemplateStore = create<TemplateState>()((set, get) => ({
  templates: [],
  isLoading: false,
  error: null,
  initialized: false,

  initialize: async (projectId: string) => {
    if (get().initialized) return

    set({ isLoading: true, error: null })

    try {
      // Get the dashboardsTemplates collection from your existing database
      const templatesCollection = database.dashboardTemplates

      // Initial load of templates
      const templates = await templatesCollection
        .find({
          selector: {
            projectId: projectId,
          },
        })
        .exec()

      set({ templates: templates.map((t) => t.toJSON()), initialized: true })
      set({ isLoading: false })
    } catch (error) {
      console.error("Failed to initialize RxDB templates:", error)
      set({
        error: "Failed to initialize templates database",
        isLoading: false,
      })
    }
  },

  addTemplate: async (template) => {
    set({ isLoading: true, error: null })

    try {
      const templatesCollection = database.dashboardTemplates
      const id = `template-${Date.now()}`
      const now = Date.now()

      const newTemplate = {
        ...template,
        id,
        createdAt: now,
        updatedAt: now,
      }

      await templatesCollection.insert(newTemplate)
      set((state) => ({
        templates: [...state.templates, newTemplate],
        isLoading: false,
      }))

      return id
    } catch (error) {
      console.error("Failed to add template:", error)
      set({ error: "Failed to add template", isLoading: false })
      throw error
    }
  },

  updateTemplate: async (id, template) => {
    set({ isLoading: true, error: null })

    try {
      const templatesCollection = database.dashboardTemplates
      const existingTemplate = await templatesCollection.findOne(id).exec()

      if (!existingTemplate) {
        throw new Error("Template not found")
      }

      const updated = await existingTemplate.update({
        $set: {
          ...template,
          updatedAt: Date.now(),
        },
      })

      set((state) => ({
        templates: state.templates.map((t) =>
          t.id === id ? { ...t, ...updated } : t
        ),
        isLoading: false,
      }))
    } catch (error) {
      console.error("Failed to update template:", error)
      set({ error: "Failed to update template", isLoading: false })
      throw error
    }
  },

  deleteTemplate: async (id) => {
    set({ isLoading: true, error: null })

    try {
      const templatesCollection = database.dashboardTemplates
      const template = await templatesCollection.findOne(id).exec()

      if (template) {
        await template.remove()
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== id),
          isLoading: false,
        }))
      } else {
        set({ isLoading: false })
      }
    } catch (error) {
      console.error("Failed to delete template:", error)
      set({ error: "Failed to delete template", isLoading: false })
      throw error
    }
  },
  templateActive: async (id) => {
    set({ isLoading: true, error: null })

    try {
      const templatesCollection = database.dashboardTemplates

      const templateToActivate = await templatesCollection.findOne(id).exec()

      if (!templateToActivate) {
        throw new Error("Template not found")
      }

      const activeTemplates = await templatesCollection
        .find({
          selector: {
            projectId: templateToActivate.get("projectId"),
            isActive: true,
          },
        })
        .exec()

      for (const activeTemplate of activeTemplates) {
        if (activeTemplate.id !== id) {
          await activeTemplate.update({
            $set: { isActive: false },
          })
        }
      }

      await templateToActivate.update({
        $set: { isActive: true },
      })

      set((state) => ({
        templates: state.templates.map((t) =>
          t.id === id
            ? { ...t, isActive: true }
            : t.projectId === templateToActivate.get("projectId")
              ? { ...t, isActive: false }
              : t
        ),
        isLoading: false,
      }))

      // Return the activated template
      return templateToActivate.toJSON()
    } catch (error) {
      console.error("Failed to activate template:", error)
      set({
        error: "Failed to activate template",
        isLoading: false,
      })
      return null
    }
  },

  getActiveTemplate: async (projectId: string) => {
    try {
      const templatesCollection = database.dashboardTemplates

      // Find a template that matches both projectId and isActive=true
      const activeTemplate = await templatesCollection
        .findOne({
          selector: {
            projectId: projectId,
            isActive: true,
          },
        })
        .exec()

      return activeTemplate ? activeTemplate.toJSON() : null
    } catch (error) {
      console.error("Failed to get active template:", error)
      return null
    }
  },
  getTemplatesByProjectId: (projectId) => {
    return get().templates.filter((t) => t.projectId === projectId)
  },

  getTemplatesByTag: (tag) => {
    return get().templates.filter((t) => t.tags.includes(tag))
  },

  getTemplateById: async (id) => {
    const templatesCollection = database.dashboardTemplates
    const existingTemplate = await templatesCollection.findOne(id).exec()
    return existingTemplate?.toJSON() ?? null // convert to plain object
  },
}))
