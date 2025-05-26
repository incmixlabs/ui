import { create } from "zustand"
import { database } from "../sql/main"

export interface Dashboard {
  id: string
  name: string
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
    dashboard: Pick<Dashboard, "name" | "createdBy" | "updatedBy">
  ) => Promise<string>
  deleteDashboard: (id: string) => Promise<void>
  cloneDashboard: (id: string, newName: string) => Promise<string>
  getDashboardById: (id: string) => Promise<Dashboard | null>
  getDashboards: () => Promise<Dashboard[]>
}

// Validation and normalization function
const validateAndNormalizeDashboard = (dashboard: any): Dashboard => {
  return {
    id: dashboard.id,
    name: dashboard.name,
    createdAt: dashboard.createdAt,
    updatedAt: dashboard.updatedAt,
    createdBy: dashboard.createdBy,
    updatedBy: dashboard.updatedBy,
  }
}

export const useRealDashboardStore = create<DashboardState>()((set, get) => ({
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
    } catch (error) {
      console.error("Failed to initialize RxDB dashboards:", error)
      set({
        error: "Failed to initialize dashboards database",
        isDashLoading: false,
        initialized: false, // Keep as false if initialization failed
      })
    }
  },
  addDashboard: async (dashboard) => {
    set({ isDashLoading: true, error: null })

    try {
      const dashboardsCollection = database.dashboards

      const baseId = dashboard.name.toLowerCase().replace(/\s+/g, "-")
      let newId = baseId
      let counter = 1
      while (await dashboardsCollection.findOne(newId).exec()) {
        newId = `${baseId}-${counter}`
        counter++
      }

      const now = new Date().toISOString()

      // Create dashboard with empty mainLayouts by default
      const newDashboard = {
        id: newId,
        name: dashboard.name,
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

      return newId
    } catch (error) {
      console.error("Failed to add dashboard:", error)
      set({ error: "Failed to add dashboard", isDashLoading: false })
      throw error
    }
  },

  deleteDashboard: async (id) => {
    set({ isDashLoading: true, error: null })

    try {
      const dashboardsCollection = database.dashboards
      const dashboard = await dashboardsCollection.findOne(id).exec()

      if (dashboard) {
        await dashboard.remove()
        set((state) => ({
          dashboards: state.dashboards.filter((d) => d.id !== id),
          isDashLoading: false,
        }))
      } else {
        set({ isDashLoading: false })
      }
    } catch (error) {
      console.error("Failed to delete dashboard:", error)
      set({ error: "Failed to delete dashboard", isDashLoading: false })
      throw error
    }
  },

  cloneDashboard: async (id, newName) => {
    set({ isDashLoading: true, error: null })

    try {
      const dashboardsCollection = database.dashboards
      const templatesCollection = database.dashboardTemplates

      // First check if the dashboard exists
      const originalDashboard = await dashboardsCollection.findOne(id).exec()
      console.log(originalDashboard)

      if (!originalDashboard) {
        set({ isDashLoading: false })
        throw new Error("Dashboard not found")
      }

      const templates = await templatesCollection
        .find({
          selector: {
            projectId: id,
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
      const baseId = newName.toLowerCase().replace(/\s+/g, "-")
      let newDashboardId = baseId
      let counter = 1

      while (await dashboardsCollection.findOne(newDashboardId).exec()) {
        newDashboardId = `${baseId}-${counter}`
        counter++
      }

      while (await dashboardsCollection.findOne(newDashboardId).exec()) {
        newDashboardId = `${baseId}-${counter}`
        counter++
      }

      const now = new Date().toISOString()

      // Create the new dashboard
      const clonedDashboard = {
        id: newDashboardId,
        name: newName,
        createdAt: now,
        updatedAt: now,
        createdBy: originalData.createdBy,
        updatedBy: originalData.updatedBy,
      }
      await dashboardsCollection.insert(clonedDashboard)

      console.log("templates", templates)

      // Clone ALL templates - update only the ID and projectId, keep everything else the same
      const clonedTemplates = []

      for (let i = 0; i < templates.length; i++) {
        const template = templates[i]
        const templateData = template.toJSON()

        // Generate new template ID
        const newTemplateId = `template-${Date.now()}-${i}`

        const clonedTemplate = {
          ...templateData,
          projectId: newDashboardId,
          id: newTemplateId,
        }

        console.log(clonedTemplate)

        // Insert each template
        await templatesCollection.insert(clonedTemplate)
        clonedTemplates.push(clonedTemplate)

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
        error: error.message || "Failed to clone dashboard",
        isDashLoading: false,
      })
      throw error
    }
  },

  getDashboardById: async (id) => {
    try {
      const dashboardsCollection = database.dashboards
      const existingDashboard = await dashboardsCollection.findOne(id).exec()

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
