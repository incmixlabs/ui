
import { generateUniqueId } from "../utils/browser-helpers"
import type { Layout } from "@incmix/react-grid-layout"

import { database } from "sql/main"
import { create } from "zustand"

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
  templateName: string
  dashboardLink: string
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
  initialize: (dashboardId: string) => Promise<void>
  addTemplate: (
    template: Omit<DashboardTemplate, "id" | "createdAt" | "updatedAt">
  ) => Promise<string>
  updateTemplate: (
    templateId: string,
    template: Partial<DashboardTemplate>
  ) => Promise<void>
  deleteTemplate: (templateId: string) => Promise<void>
  templateActive: (templateId: string) => Promise<DashboardTemplate | null>
  getTemplatesByTemplateId: (templateId: string) => DashboardTemplate[]
  getTemplatesByTag: (tag: string) => DashboardTemplate[]
  getTemplateById: (templateId: string) => Promise<DashboardTemplate | null>
  getActiveTemplate: (dashboardId: string) => Promise<DashboardTemplate | null>
  validateAndNormalizeTemplate: (template: any) => any
}

/**
 * Validates and normalizes a template to ensure it has the correct structure
 * with nested layouts properly included in the layout items
 */
const validateAndNormalizeTemplate = (template: any): any => {
  if (!template) return template

  const normalizedTemplate = JSON.parse(JSON.stringify(template))

  const legacyLayouts =
    normalizedTemplate.layouts ?? normalizedTemplate.nestedLayouts

  if (legacyLayouts && !normalizedTemplate.mainLayouts) {
    normalizedTemplate.mainLayouts = legacyLayouts
    normalizedTemplate.layouts = undefined
    normalizedTemplate.nestedLayouts = undefined
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

  initialize: async (dashboardId: string) => {
    if (get().initialized) return

    set({ isLoading: true, error: null })

    try {
      const templatesCollection = database.dashboardTemplates

      const templates = await templatesCollection
        .find({
          selector: {
            dashboardLink: dashboardId,
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
      const id = generateUniqueId("template")
      const now = Date.now()

      const normalizedTemplate = validateAndNormalizeTemplate({
        ...template,
        id,
        createdAt: now,
        updatedAt: now,
      })

      console.log("normalizedTemplate", normalizedTemplate)

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

  updateTemplate: async (templateId, template) => {
    set({ isLoading: true, error: null })

    try {
      const templatesCollection = database.dashboardTemplates
      const existingTemplate = await templatesCollection
        .findOne({ selector: { id: templateId } })
        .exec()

      if (!existingTemplate) {
        throw new Error("Template not found")
      }

      const timestamp = Date.now()

      // Normalize the template before updating
      const normalizedUpdate = validateAndNormalizeTemplate({
        ...existingTemplate.toJSON(), // keep untouched properties
        ...template,
        updatedAt: timestamp,
      })

      await existingTemplate.update({
        $set: normalizedUpdate,
      })

      set((state) => ({
        templates: state.templates.map((t) =>
          t.id === templateId ? { ...t, ...normalizedUpdate } : t
        ),
        isLoading: false,
      }))
    } catch (error) {
      console.error("Failed to update template:", error)
      set({ error: "Failed to update template", isLoading: false })
      throw error
    }
  },

  deleteTemplate: async (templateId) => {
    set({ isLoading: true, error: null })

    try {
      const templatesCollection = database.dashboardTemplates
      const template = await templatesCollection
        .findOne({ selector: { id: templateId } })
        .exec()

      if (template) {
        await template.remove()
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== templateId),
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

  templateActive: async (templateId) => {
    set({ isLoading: true, error: null })

    try {
      console.log("templateId", templateId)

      const templatesCollection = database.dashboardTemplates

      const templateToActivate = await templatesCollection
        .findOne({ selector: { id: templateId } })
        .exec()

      if (!templateToActivate) {
        throw new Error("Template not found")
      }

      const activeTemplates = await templatesCollection
        .find({
          selector: {
            id: templateToActivate.id,
            isActive: true,
          },
        })
        .exec()

      for (const activeTemplate of activeTemplates) {
        if (activeTemplate.id !== templateId) {
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
          t.id === templateId
            ? { ...t, isActive: true }
            : t.id === templateToActivate.id
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

  getActiveTemplate: async (dashboardId: string) => {
    try {
      const templatesCollection = database.dashboardTemplates

      const activeTemplate = await templatesCollection
        .findOne({
          selector: {
            dashboardLink: dashboardId,
            isActive: true,
          },
        })
        .exec()
      console.log("activeTeamptle get fromdb", dashboardId)

      if (!activeTemplate) return null

      const templateData = activeTemplate.toJSON()
      return validateAndNormalizeTemplate(templateData)
    } catch (error) {
      console.error("Failed to get active template:", error)
      return null
    }
  },

  getTemplatesByTemplateId: (templateId) => {
    return get().templates.filter((t) => t.id === templateId)
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
