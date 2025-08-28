import { create } from "zustand"
import { database } from "../../sql/main"

import { generateNameBasedId } from "@incmix/utils/schema"
import { generateUniqueId } from "../../utils/browser-helpers"

export interface Dashboard {
  id: string
  dashboardName: string
  dashboardId?: string
  createdAt: string
  updatedAt: string
  createdBy?: string
  updatedBy?: string
}

interface DashboardState {
  dashboards: Dashboard[]
  isDashLoading: boolean
  error: string | null
  initialized: boolean

  // Actions
  initialize: () => Promise<void>
  addDashboard: (
    dashboard: Pick<Dashboard, "dashboardName" | "createdBy" | "updatedBy">
  ) => Promise<string>
  deleteDashboard: (currentDashboardId: string) => Promise<void>
  cloneDashboard: (currentDashboardId: string) => Promise<string>
  cloneHomeDashboard: (
    currentDashboardId: string,
    dashboardName: string
  ) => Promise<string>
  editDashboard: (
    currentDashboardId: string,
    dashboardName: string
  ) => Promise<string>
  getDashboardById: (currentDashboardId: string) => Promise<Dashboard | null>
  getDashboards: () => Promise<Dashboard[]>
}

// Validation and normalization function
const validateAndNormalizeDashboard = (dashboard: any): Dashboard => {
  return {
    id: dashboard.id,
    dashboardName: dashboard.dashboardName,
    dashboardId: dashboard.dashboardId,
    createdAt: dashboard.createdAt,
    updatedAt: dashboard.updatedAt,
    createdBy: dashboard.createdBy,
    updatedBy: dashboard.updatedBy,
  }
}

export const useDashboardStore = create<DashboardState>()((set, get) => ({
  dashboards: [],
  isDashLoading: false,
  error: null,
  initialized: false,

  initialize: async () => {
    // Check if already initialized to prevent duplicate calls
    if (get().initialized) {
      console.log("Dashboard store already initialized")
      return
    }

    console.log("Initializing dashboard store...")
    set({ isDashLoading: true, error: null })

    try {
      const dashboardsCollection = database.dashboards

      // Fetch all dashboards from the database
      const dashboards = await dashboardsCollection.find().exec()

      // Normalize dashboards to ensure they have the correct structure
      const normalizedDashboards = dashboards.map((d) => {
        const dashboardData = d.toJSON()
        return validateAndNormalizeDashboard(dashboardData)
      })

      console.log(`Loaded ${normalizedDashboards.length} dashboards`)

      // Update store with fetched data and mark as initialized
      set({
        dashboards: normalizedDashboards,
        initialized: true,
        isDashLoading: false,
        error: null,
      })
    } catch (_error) {
      set({
        error: "Failed to initialize dashboards database",
        isDashLoading: false,
        initialized: false,
      })
    }
  },
  addDashboard: async (
    dashboard: Pick<Dashboard, "dashboardName" | "createdBy" | "updatedBy">
  ) => {
    set({ isDashLoading: true, error: null })

    try {
      const dashboardsCollection = database.dashboards
      const collectionId = generateUniqueId("dashboard")
      console.log("collectionId: ", collectionId)

      const newDashboardId = await generateNameBasedId(
        dashboard.dashboardName,
        async (id) => {
          const existing = await dashboardsCollection
            .findOne({
              selector: { dashboardId: id },
            })
            .exec()
          return !!existing
        }
      )

      // const baseId = dashboard.dashboardName.toLowerCase().replace(/\s+/g, "-")
      // let newDashboardId = baseId
      // let counter = 1

      // while (
      //   await dashboardsCollection
      //     .findOne({
      //       selector: { dashboardId: newDashboardId },
      //     })
      //     .exec()
      // ) {
      //   newDashboardId = `${baseId}-${counter}`
      //   counter++
      // }

      const now = new Date().toISOString()

      // Create dashboard with empty mainLayouts by default
      const newDashboard = {
        id: collectionId,
        dashboardName: dashboard.dashboardName,
        dashboardId: newDashboardId,
        createdAt: now,
        updatedAt: now,
        createdBy: dashboard.createdBy,
        updatedBy: dashboard.updatedBy,
      }

      await dashboardsCollection.insert(newDashboard)
      // Update store state immediately
      set((state) => ({
        dashboards: [...state.dashboards, newDashboard],
        isDashLoading: false,
      }))

      return newDashboardId
    } catch (error) {
      console.error("Failed to add dashboard:", error)
      set({ error: "Failed to add dashboard", isDashLoading: false })
      throw error
    }
  },

  deleteDashboard: async (currentDashboardId) => {
    set({ isDashLoading: true, error: null })

    try {
      const dashboardsCollection = database.dashboards
      const templatesCollection = database.dashboardTemplates

      const originalDashboard = await dashboardsCollection
        .findOne({
          selector: { dashboardId: currentDashboardId },
        })
        .exec()

      const templates = await templatesCollection
        .find({
          selector: {
            dashboardLink: currentDashboardId,
          },
        })
        .exec()

      if (originalDashboard) {
        if (templates && templates.length > 0) {
          for (const template of templates) {
            await template.remove()
          }
        }

        await originalDashboard.remove()

        set((state) => ({
          dashboards: state.dashboards.filter(
            (d) => d.dashboardId !== currentDashboardId
          ),
          isDashLoading: false,
        }))

        // console.log(`Successfully deleted dashboard ${currentDashboardId} and ${templates.length} templates`)
      } else {
        set({ isDashLoading: false })
        throw new Error("Dashboard not found")
      }
    } catch (error) {
      console.error("Failed to delete dashboard:", error)
      set({
        error:
          error instanceof Error ? error.message : "Failed to delete dashboard",
        isDashLoading: false,
      })
      throw error
    }
  },

  cloneDashboard: async (currentDashboardId) => {
    set({ isDashLoading: true, error: null })

    try {
      const dashboardsCollection = database.dashboards
      const templatesCollection = database.dashboardTemplates

      const originalDashboard = await dashboardsCollection
        .findOne({
          selector: { dashboardId: currentDashboardId },
        })
        .exec()

      if (!originalDashboard) {
        set({ isDashLoading: false })
        throw new Error("Dashboard not found")
      }

      const templates = await templatesCollection
        .find({
          selector: {
            dashboardLink: currentDashboardId,
          },
        })
        .exec()

      if (!templates || templates.length === 0) {
        set({
          error:
            "You can't clone this dashboard because it doesn't have any templates",
          isDashLoading: false,
        })
        throw new Error(
          "You can't clone this dashboard because it doesn't have any templates"
        )
      }

      const originalData = originalDashboard.toJSON()
      const newCollectionId = generateUniqueId("dashboard")
      console.log("newCollectionId: ", newCollectionId)

      // const newDashboardId = `${currentDashboardId}-copy`
      // let counter = 1

      // while (await dashboardsCollection.findOne({selector: {dashboardId: newDashboardId}}).exec()) {
      //   newDashboardId = `${currentDashboardId}-copy-${counter}`
      //   counter++
      // }

      // Generate a unique ID based on the dashboard name
      const newDashboardId = await generateNameBasedId(
        `${currentDashboardId}-copy`,
        async (id) => {
          // Check if ID already exists in the database
          const existing = await dashboardsCollection
            .findOne({
              selector: { dashboardId: id },
            })
            .exec()
          return !!existing
        }
      )

      const now = new Date().toISOString()

      const clonedDashboard = {
        id: newCollectionId,
        dashboardName: `${originalData.dashboardName} Copy`,
        dashboardId: newDashboardId,
        createdAt: now,
        updatedAt: now,
        createdBy: originalData.createdBy,
        updatedBy: originalData.updatedBy,
      }
      await dashboardsCollection.insert(clonedDashboard)

      for (let i = 0; i < templates.length; i++) {
        const template = templates[i]
        const templateData = template.toJSON()
        const newTemplateCollectionId = generateUniqueId("template")
        const templateTime = Date.now()

        const clonedTemplate = {
          ...templateData,
          dashboardLink: newDashboardId,
          id: newTemplateCollectionId,
          updatedAt: templateTime,
        }

        // console.log(clonedTemplate)
        // @ts-ignore
        await templatesCollection.insert(clonedTemplate)
        console.log(
          `Cloned template ${i + 1}/${templates.length}: ${templateData.id} -> ${newTemplateCollectionId}`
        )
      }

      set((state) => ({
        dashboards: [...state.dashboards, clonedDashboard],
        isDashLoading: false,
      }))

      return newDashboardId
    } catch (error) {
      console.error("Failed to clone dashboard:", error)
      set({
        error:
          error instanceof Error ? error.message : "Failed to clone dashboard",
        isDashLoading: false,
      })
      throw error
    }
  },
  cloneHomeDashboard: async (currentDashboardId, dashName) => {
    set({ isDashLoading: true, error: null })

    try {
      const dashboardsCollection = database.dashboards
      const templatesCollection = database.dashboardTemplates
      const templates = await templatesCollection
        .find({
          selector: {
            dashboardLink: currentDashboardId,
          },
        })
        .exec()

      if (!templates || templates.length === 0) {
        set({
          error:
            "You can't clone this dashboard because it doesn't have any templates",
          isDashLoading: false,
        })
        throw new Error(
          "You can't clone this dashboard because it doesn't have any templates"
        )
      }

      // const baseId = dashName.toLowerCase().replace(/\s+/g, "-")
      // let newId = baseId
      // let counter = 1
      // while (
      //   await dashboardsCollection
      //     .findOne({
      //       selector: { dashboardId: newId },
      //     })
      //     .exec()
      // ) {
      //   newId = `${baseId}-${counter}`
      //   counter++
      // }

      const newDashboardId = await generateNameBasedId(dashName, async (id) => {
        const existing = await dashboardsCollection
          .findOne({
            selector: { dashboardId: id },
          })
          .exec()
        return !!existing
      })

      const now = new Date().toISOString()

      const clonedDashboard = {
        id: generateUniqueId("dashboard"),
        dashboardId: newDashboardId,
        dashboardName: `${dashName}`,
        createdAt: now,
        updatedAt: now,
        createdBy: "",
        updatedBy: "",
      }

      await dashboardsCollection.insert(clonedDashboard)

      console.log("templates", templates)

      for (let i = 0; i < templates.length; i++) {
        const template = templates[i]
        const templateData = template.toJSON()
        const templateTime = Date.now()
        const newTemplateId = generateUniqueId("template")

        const clonedTemplate = {
          id: newTemplateId,
          templateName: templateData.templateName,
          dashboardLink: newDashboardId,
          updatedAt: templateTime,
          tags: Array.from(templateData.tags), // Convert DeepReadonlyArray to string[]
          mainLayouts: {
            xxs: templateData.mainLayouts.xxs
              ? templateData.mainLayouts.xxs.map((item: any) => ({ ...item }))
              : [],
            xs: templateData.mainLayouts.xs.map((item: any) => ({ ...item })),
            sm: templateData.mainLayouts.sm.map((item: any) => ({ ...item })),
            md: templateData.mainLayouts.md.map((item: any) => ({ ...item })),
            lg: templateData.mainLayouts.lg.map((item: any) => ({ ...item })),
          },
          createdAt: templateData.createdAt || templateTime,
        }

        await templatesCollection.insert(clonedTemplate)
        console.log(
          `Cloned template ${i + 1}/${templates.length}: ${templateData.id} -> ${newTemplateId}`
        )
      }

      set((state) => ({
        dashboards: [...state.dashboards, clonedDashboard],
        isDashLoading: false,
      }))

      return newDashboardId
    } catch (error) {
      console.error("Failed to clone dashboard:", error)
      set({
        error:
          error instanceof Error ? error.message : "Failed to clone dashboard",
        isDashLoading: false,
      })
      throw error
    }
  },

  editDashboard: async (currentDashboardId, newName) => {
    set({ isDashLoading: true, error: null })

    try {
      const dashboardsCollection = database.dashboards
      const templatesCollection = database.dashboardTemplates

      // Find dashboard by dashboardId field (not primary key id)
      const originalDashboard = await dashboardsCollection
        .findOne({
          selector: {
            dashboardId: currentDashboardId,
          },
        })
        .exec()

      if (!originalDashboard) {
        set({ isDashLoading: false })
        throw new Error("Dashboard not found")
      }

      // Find templates by projectId
      const templates = await templatesCollection
        .find({
          selector: {
            dashboardLink: currentDashboardId,
          },
        })
        .exec()

      const newDashboardId = await generateNameBasedId(newName, async (id) => {
        const existing = await dashboardsCollection
          .findOne({
            selector: {
              dashboardId: id,
              id: { $ne: originalDashboard.get("id") },
            },
          })
          .exec()
        return !!existing
      })

      const now = new Date().toISOString()

      await originalDashboard.update({
        $set: {
          dashboardId: newDashboardId,
          dashboardName: newName.trim(),
          updatedAt: now,
        },
      })

      if (templates && templates.length > 0) {
        for (let i = 0; i < templates.length; i++) {
          const template = templates[i]
          const templateTime = Date.now()

          await template.update({
            $set: {
              dashboardLink: newDashboardId,
              updatedAt: templateTime,
            },
          })

          console.log(
            `Updated template ${i + 1}/${templates.length}: templateId -> ${newDashboardId}`
          )
        }
      }

      // Update store state
      set((state) => ({
        dashboards: state.dashboards.map((d) =>
          d.dashboardId === currentDashboardId
            ? {
                ...d,
                dashboardId: newDashboardId,
                dashboardName: newName.trim(),
                updatedAt: now,
              }
            : d
        ),
        isDashLoading: false,
      }))

      console.log(`Successfully updated dashboard to: ${newDashboardId}`)
      return newDashboardId
    } catch (error) {
      console.error("Failed to edit dashboard:", error)
      set({
        error:
          error instanceof Error ? error.message : "Failed to edit dashboard",
        isDashLoading: false,
      })
      throw error
    }
  },

  getDashboardById: async (currentDashboardId) => {
    try {
      const dashboardsCollection = database.dashboards
      const existingDashboard = await dashboardsCollection
        .findOne({
          selector: { dashboardId: currentDashboardId },
        })
        .exec()

      if (!existingDashboard) return null

      const dashboardData = existingDashboard.toJSON()
      return validateAndNormalizeDashboard(dashboardData)
    } catch (error) {
      console.error("Failed to get dashboard by ID:", error)
      return null
    }
  },
  getDashboards: async () => {
    try {
      set({ isDashLoading: true })
      const dashboardsCollection = database.dashboards
      const dashboards = await dashboardsCollection.find().exec()

      if (!dashboards || dashboards.length === 0) return []

      // Map over all dashboards and normalize each one
      const normalizedDashboards = dashboards.map((dashboard) => {
        const dashboardData = dashboard.toJSON()
        return validateAndNormalizeDashboard(dashboardData)
      })
      set({ isDashLoading: false })
      return normalizedDashboards
    } catch (error) {
      console.error("Failed to get dashboards:", error)
      return []
    }
  },
}))
