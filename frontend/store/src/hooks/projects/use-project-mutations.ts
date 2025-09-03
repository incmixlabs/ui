import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import type { RxDatabase } from "rxdb"
import { useRxDB } from "rxdb-hooks"

import { useOrganizationStore } from "../../services/organizations"
import type { ProjectDocType, TaskCollections } from "../../sql/types"
import {
  generateBrowserUniqueId,
  getCurrentTimestamp,
} from "../../utils/browser-helpers"

// TODO: Replace with actual user context when available
const getCurrentUserId = (): string => {
  // This should be replaced with actual user context
  return "current-user-id"
}

export interface UpdateProjectData {
  name?: string
  description?: string
  company?: string
  status?: "started" | "on-hold" | "completed" // Removed "all" as it's not a valid project status
  logo?: string
  startDate?: number | null
  endDate?: number | null
  budget?: number
}

export interface UseProjectMutationsReturn {
  updateProject: {
    mutate: (data: { id: string; updates: UpdateProjectData }) => void
    mutateAsync: (data: {
      id: string
      updates: UpdateProjectData
    }) => Promise<ProjectDocType>
    isLoading: boolean
    error: Error | null
  }
  deleteProject: {
    mutate: (projectId: string) => void
    mutateAsync: (projectId: string) => Promise<void>
    isLoading: boolean
    error: Error | null
  }
  duplicateProject: {
    mutate: (data: { id: string; newName?: string }) => void
    mutateAsync: (data: {
      id: string
      newName?: string
    }) => Promise<ProjectDocType>
    isLoading: boolean
    error: Error | null
  }
}

/**
 * Custom hook providing project mutation operations (update, delete, duplicate)
 * @returns Object with mutation functions and their states
 */
export function useProjectMutations(): UseProjectMutationsReturn {
  const { selectedOrganisation } = useOrganizationStore()
  const db: RxDatabase<TaskCollections> = useRxDB()
  const queryClient = useQueryClient()

  const updateProjectMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: { id: string; updates: UpdateProjectData }) => {
      if (!db.projects) {
        throw new Error("Database not available")
      }

      const projectDoc = await db.projects
        .findOne({
          selector: { id },
        })
        .exec()

      if (!projectDoc) {
        throw new Error(`Project with ID ${id} not found`)
      }

      const updatedData = {
        ...updates,
        updatedAt: getCurrentTimestamp(),
        updatedBy: getCurrentUserId(),
      }

      await projectDoc.update({ $set: updatedData })

      // Return the updated document
      const refreshedDoc = await db.projects
        .findOne({
          selector: { id },
        })
        .exec()

      if (!refreshedDoc) {
        throw new Error("Failed to retrieve updated project")
      }

      return refreshedDoc.toJSON()
    },
    onSuccess: () => {
      // Invalidate and refetch project queries
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
    onError: (error) => {
      console.error("Failed to update project:", error)
    },
  })

  const deleteProjectMutation = useMutation({
    mutationFn: async (projectId: string) => {
      if (!db.projects) {
        throw new Error("Database not available")
      }

      const projectDoc = await db.projects
        .findOne({
          selector: { id: projectId },
        })
        .exec()

      if (!projectDoc) {
        throw new Error(`Project with ID ${projectId} not found`)
      }

      // Also delete all associated tasks and labels for this project
      if (db.tasks) {
        const projectTasks = await db.tasks
          .find({
            selector: { projectId },
          })
          .exec()

        await Promise.all(projectTasks.map((task) => task.remove()))
      }

      if (db.labels) {
        const projectLabels = await db.labels
          .find({
            selector: { projectId },
          })
          .exec()

        await Promise.all(projectLabels.map((label) => label.remove()))
      }

      await projectDoc.remove()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      queryClient.invalidateQueries({ queryKey: ["labels"] })
    },
    onError: (error) => {
      console.error("Failed to delete project:", error)
    },
  })

  const duplicateProjectMutation = useMutation({
    mutationFn: async ({ id, newName }: { id: string; newName?: string }) => {
      if (!db.projects || !selectedOrganisation) {
        throw new Error("Database or organization not available")
      }

      const originalDoc = await db.projects
        .findOne({
          selector: { id },
        })
        .exec()

      if (!originalDoc) {
        throw new Error(`Project with ID ${id} not found`)
      }

      const originalData = originalDoc.toJSON()
      const now = getCurrentTimestamp()
      const newId = generateBrowserUniqueId()

      const duplicatedProject: ProjectDocType = {
        ...originalData,
        id: newId,
        name: newName || `${originalData.name} (Copy)`,
        createdAt: now,
        updatedAt: now,
        createdBy: getCurrentUserId(),
        updatedBy: getCurrentUserId(),
      }

      const newDoc = await db.projects.insert(duplicatedProject)
      return newDoc.toJSON()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
    onError: (error) => {
      console.error("Failed to duplicate project:", error)
    },
  })

  return {
    updateProject: {
      mutate: updateProjectMutation.mutate,
      mutateAsync: updateProjectMutation.mutateAsync,
      isLoading: updateProjectMutation.isPending,
      error: updateProjectMutation.error,
    },
    deleteProject: {
      mutate: deleteProjectMutation.mutate,
      mutateAsync: deleteProjectMutation.mutateAsync,
      isLoading: deleteProjectMutation.isPending,
      error: deleteProjectMutation.error,
    },
    duplicateProject: {
      mutate: duplicateProjectMutation.mutate,
      mutateAsync: duplicateProjectMutation.mutateAsync,
      isLoading: duplicateProjectMutation.isPending,
      error: duplicateProjectMutation.error,
    },
  }
}
