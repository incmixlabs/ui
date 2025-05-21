
import type { Layout } from "@incmix/react-grid-layout"
import { create } from "zustand"
import { database } from "../sql/main"

export type Breakpoint = "lg" | "md" | "sm" | "xs" | "xxs"

export interface LayoutItemWithNested extends Layout {
  layouts?: Layout[]
  compactType?: "horizontal" | "vertical" | null
  [key: string]: any
}

export type CustomLayouts = {
  [key in Breakpoint]: LayoutItemWithNested[]
}

export interface DashboardTemplate {
  id: string
  name: string
  projectId: string
  tags: string[]
  mainLayouts: CustomLayouts // Keeping mainLayouts to avoid confusion with nested layouts
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
  validateAndNormalizeTemplate: (template: any) => any
}

/**
 * Validates and normalizes a template to ensure it has the correct structure
 * with nested layouts properly included in the layout items
 */
const validateAndNormalizeTemplate = (template: any): any => {
  if (!template) return template

  const normalizedTemplate = JSON.parse(JSON.stringify(template))

  if (normalizedTemplate.layouts && !normalizedTemplate.mainLayouts) {
    normalizedTemplate.mainLayouts = normalizedTemplate.layouts
    normalizedTemplate.layouts = undefined
  }

  if (!normalizedTemplate.mainLayouts) {
    normalizedTemplate.mainLayouts = {
      lg: [],
      md: [],
      sm: [],
      xs: [],
      xxs: [],
    }
  }

  // Ensure all breakpoints exist
  const breakpoints: Breakpoint[] = ["lg", "md", "sm", "xs", "xxs"]
  breakpoints.forEach((breakpoint) => {
    if (!normalizedTemplate.mainLayouts[breakpoint]) {
      normalizedTemplate.mainLayouts[breakpoint] = []
    }
  })

  // Ensure all grid items that should have nested layouts have them
  breakpoints.forEach((breakpoint) => {
    normalizedTemplate.mainLayouts[breakpoint].forEach(
      (item: LayoutItemWithNested) => {
        // If this is a grid item (starts with "grid-") but doesn't have layouts, initialize it
        if (item.i?.startsWith("grid-") && !item.layouts) {
          item.layouts = []
        }
      }
    )
  })

  return normalizedTemplate
}

export const useTemplateStore = create<TemplateState>()((set, get) => ({
  templates: [],
  isLoading: false,
  error: null,
  initialized: false,
  validateAndNormalizeTemplate,

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

      // Normalize templates to ensure they have the correct structure
      const normalizedTemplates = templates.map((t) => {
        const templateData = t.toJSON()
        return validateAndNormalizeTemplate(templateData)
      })

      set({ templates: normalizedTemplates, initialized: true })
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

      // Normalize the template before saving
      const normalizedTemplate = validateAndNormalizeTemplate({
        ...template,
        id,
        createdAt: now,
        updatedAt: now,
      })

      await templatesCollection.insert(normalizedTemplate)
      set((state) => ({
        templates: [...state.templates, normalizedTemplate],
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

      const timestamp = Date.now()

      // Normalize the template before updating
      const normalizedUpdate = validateAndNormalizeTemplate({
        ...template,
        updatedAt: timestamp,
      })

      await existingTemplate.update({
        $set: normalizedUpdate,
      })

      set((state) => ({
        templates: state.templates.map((t) =>
          t.id === id ? { ...t, ...normalizedUpdate } : t
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

      // Return the activated template, normalized to ensure correct structure
      const activatedTemplate = templateToActivate.toJSON()
      return validateAndNormalizeTemplate(activatedTemplate)
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

      if (!activeTemplate) return null

      // Normalize the template to ensure correct structure
      const templateData = activeTemplate.toJSON()
      return validateAndNormalizeTemplate(templateData)
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
    try {
      const templatesCollection = database.dashboardTemplates
      const existingTemplate = await templatesCollection.findOne(id).exec()

      if (!existingTemplate) return null

      // Normalize the template to ensure correct structure
      const templateData = existingTemplate.toJSON()
      return validateAndNormalizeTemplate(templateData)
    } catch (error) {
      console.error("Failed to get template by ID:", error)
      return null
    }
  },
}))
