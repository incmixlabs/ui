import type { LabelSchema } from "@incmix/utils/schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import type { RxDatabase } from "rxdb"
import { useRxDB } from "rxdb-hooks"

import type { LabelDocType, TaskCollections } from "../../sql/types"
import {
  generateBrowserUniqueId,
  getCurrentTimestamp,
} from "../../utils/browser-helpers"

// TODO: Replace with actual user context when available
const getCurrentUserId = (): string => {
  return "current-user-id"
}

const getCurrentUser = () => ({
  id: getCurrentUserId(),
  name: "Current User",
  image: "/placeholder.svg",
})

export interface CreateLabelData {
  projectId: string
  type: "status" | "priority"
  name: string
  color?: string
  description?: string
  order?: number
}

export interface UpdateLabelData {
  name?: string
  color?: string
  description?: string
  order?: number
}

export interface UseProjectLabelsMutationsReturn {
  createLabel: {
    mutate: (data: CreateLabelData) => void
    mutateAsync: (data: CreateLabelData) => Promise<LabelSchema>
    isLoading: boolean
    error: Error | null
  }
  updateLabel: {
    mutate: (data: { id: string; updates: UpdateLabelData }) => void
    mutateAsync: (data: {
      id: string
      updates: UpdateLabelData
    }) => Promise<LabelSchema>
    isLoading: boolean
    error: Error | null
  }
  deleteLabel: {
    mutate: (labelId: string) => void
    mutateAsync: (labelId: string) => Promise<void>
    isLoading: boolean
    error: Error | null
  }
  reorderLabels: {
    mutate: (data: { labelIds: string[] }) => void
    mutateAsync: (data: { labelIds: string[] }) => Promise<void>
    isLoading: boolean
    error: Error | null
  }
  updateLabelName: {
    mutate: (data: { id: string; name: string }) => void
    mutateAsync: (data: { id: string; name: string }) => Promise<LabelSchema>
    isLoading: boolean
    error: Error | null
  }
  updateLabelColor: {
    mutate: (data: { id: string; color: string }) => void
    mutateAsync: (data: { id: string; color: string }) => Promise<LabelSchema>
    isLoading: boolean
    error: Error | null
  }
}

/**
 * Custom hook providing project label mutation operations
 * @returns Object with mutation functions and their states
 */
export function useProjectLabelsMutations(): UseProjectLabelsMutationsReturn {
  const db: RxDatabase<TaskCollections> = useRxDB()
  const queryClient = useQueryClient()

  const createLabelMutation = useMutation({
    mutationFn: async (data: CreateLabelData) => {
      if (!db.labels) {
        throw new Error("Labels collection not available")
      }

      const now = getCurrentTimestamp()
      const user = getCurrentUser()

      // Find the highest order in the current labels of this type for the project
      const existingLabels = await db.labels
        .find({
          selector: {
            projectId: data.projectId,
            type: data.type,
          },
          sort: [{ order: "desc" }],
        })
        .exec()

      const maxOrder =
        existingLabels.length > 0 ? existingLabels[0].toJSON().order : -1

      const newLabel: LabelSchema = {
        id: generateBrowserUniqueId("label"),
        projectId: data.projectId,
        name: data.name,
        type: data.type,
        order: data.order ?? maxOrder + 1,
        color: data.color || "#6366f1",
        description: data.description || "",
        createdAt: now,
        updatedAt: now,
        createdBy: user,
        updatedBy: user,
      }

      await db.labels.insert(newLabel as LabelDocType)
      return newLabel
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labels"] })
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
    onError: (error) => {
      console.error("Failed to create label:", error)
    },
  })

  const updateLabelMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: { id: string; updates: UpdateLabelData }) => {
      if (!db.labels) {
        throw new Error("Labels collection not available")
      }

      const labelDoc = await db.labels
        .findOne({
          selector: { id },
        })
        .exec()

      if (!labelDoc) {
        throw new Error(`Label with ID ${id} not found`)
      }

      const now = getCurrentTimestamp()
      const user = getCurrentUser()

      const updatedData = {
        ...updates,
        updatedAt: now,
        updatedBy: user,
      }

      await labelDoc.update({ $set: updatedData })

      // Return the updated document
      const refreshedDoc = await db.labels
        .findOne({
          selector: { id },
        })
        .exec()

      if (!refreshedDoc) {
        throw new Error("Failed to retrieve updated label")
      }

      const labelData = refreshedDoc.toJSON()
      return {
        ...labelData,
        color: labelData.color || "#6E6E6E",
        description: labelData.description || "",
        type: labelData.type as "status" | "priority",
      } as LabelSchema
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labels"] })
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
    onError: (error) => {
      console.error("Failed to update label:", error)
    },
  })

  const deleteLabelMutation = useMutation({
    mutationFn: async (labelId: string) => {
      if (!db.labels || !db.tasks) {
        throw new Error("Database collections not available")
      }

      const labelDoc = await db.labels
        .findOne({
          selector: { id: labelId },
        })
        .exec()

      if (!labelDoc) {
        throw new Error(`Label with ID ${labelId} not found`)
      }

      const label = labelDoc.toJSON()

      // Check if there are tasks using this label
      if (label.type === "status") {
        const tasksUsingLabel = await db.tasks
          .find({
            selector: { statusId: labelId },
          })
          .exec()

        if (tasksUsingLabel.length > 0) {
          throw new Error(
            "Cannot delete status label with tasks. Move tasks first."
          )
        }
      } else if (label.type === "priority") {
        const tasksUsingLabel = await db.tasks
          .find({
            selector: { priorityId: labelId },
          })
          .exec()

        if (tasksUsingLabel.length > 0) {
          throw new Error(
            "Cannot delete priority label with tasks. Change task priorities first."
          )
        }
      }

      await labelDoc.remove()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labels"] })
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
    onError: (error) => {
      console.error("Failed to delete label:", error)
    },
  })

  const reorderLabelsMutation = useMutation({
    mutationFn: async ({ labelIds }: { labelIds: string[] }) => {
      if (!db.labels) {
        throw new Error("Labels collection not available")
      }

      const now = getCurrentTimestamp()
      const user = getCurrentUser()

      // Update each label with new order
      const updatePromises = labelIds.map(async (labelId, index) => {
        const labelDoc = await db.labels
          .findOne({
            selector: { id: labelId },
          })
          .exec()

        if (labelDoc) {
          await labelDoc.update({
            $set: {
              order: index,
              updatedAt: now,
              updatedBy: user,
            },
          })
        }
      })

      await Promise.all(updatePromises)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labels"] })
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
    onError: (error) => {
      console.error("Failed to reorder labels:", error)
    },
  })

  // Convenience mutations for common operations
  const updateLabelNameMutation = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      return await updateLabelMutation.mutateAsync({ id, updates: { name } })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labels"] })
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })

  const updateLabelColorMutation = useMutation({
    mutationFn: async ({ id, color }: { id: string; color: string }) => {
      return await updateLabelMutation.mutateAsync({ id, updates: { color } })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labels"] })
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })

  return {
    createLabel: {
      mutate: createLabelMutation.mutate,
      mutateAsync: createLabelMutation.mutateAsync,
      isLoading: createLabelMutation.isPending,
      error: createLabelMutation.error,
    },
    updateLabel: {
      mutate: updateLabelMutation.mutate,
      mutateAsync: updateLabelMutation.mutateAsync,
      isLoading: updateLabelMutation.isPending,
      error: updateLabelMutation.error,
    },
    deleteLabel: {
      mutate: deleteLabelMutation.mutate,
      mutateAsync: deleteLabelMutation.mutateAsync,
      isLoading: deleteLabelMutation.isPending,
      error: deleteLabelMutation.error,
    },
    reorderLabels: {
      mutate: reorderLabelsMutation.mutate,
      mutateAsync: reorderLabelsMutation.mutateAsync,
      isLoading: reorderLabelsMutation.isPending,
      error: reorderLabelsMutation.error,
    },
    updateLabelName: {
      mutate: updateLabelNameMutation.mutate,
      mutateAsync: updateLabelNameMutation.mutateAsync,
      isLoading: updateLabelNameMutation.isPending,
      error: updateLabelNameMutation.error,
    },
    updateLabelColor: {
      mutate: updateLabelColorMutation.mutate,
      mutateAsync: updateLabelColorMutation.mutateAsync,
      isLoading: updateLabelColorMutation.isPending,
      error: updateLabelColorMutation.error,
    },
  }
}
