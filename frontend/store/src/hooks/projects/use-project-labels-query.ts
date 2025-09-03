import type { LabelSchema } from "@incmix/utils/schema"
import { useCallback, useEffect, useRef, useState } from "react"
import type { RxDatabase } from "rxdb"
import { useRxDB } from "rxdb-hooks"
import type { Subscription } from "rxjs"

import { useProjectStore } from "../../services/projects"
import type { LabelDocType, TaskCollections } from "../../sql/types"

export interface UseProjectLabelsQueryReturn {
  statusLabels: LabelSchema[]
  priorityLabels: LabelSchema[]
  allLabels: LabelSchema[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
  getStatusLabelById: (id: string) => LabelSchema | undefined
  getPriorityLabelById: (id: string) => LabelSchema | undefined
  getLabelsByType: (type: "status" | "priority") => LabelSchema[]
}

/**
 * Custom hook for querying project labels (status and priority)
 * Provides reactive subscriptions to label changes for the selected project
 * @param providedProjectId Optional project ID, falls back to selected project
 * @returns Object with label data, loading state, and helper functions
 */
export function useProjectLabelsQuery(
  providedProjectId?: string
): UseProjectLabelsQueryReturn {
  const { selectedProject } = useProjectStore()
  const projectId = providedProjectId || selectedProject?.id || ""

  const [statusLabels, setStatusLabels] = useState<LabelSchema[]>([])
  const [priorityLabels, setPriorityLabels] = useState<LabelSchema[]>([])
  const [allLabels, setAllLabels] = useState<LabelSchema[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const db: RxDatabase<TaskCollections> = useRxDB()
  const labelsSubscription = useRef<Subscription | null>(null)

  const transformLabelDoc = useCallback(
    (doc: { toJSON(): LabelDocType }): LabelSchema => {
      const label = doc.toJSON()
      return {
        ...label,
        color: label.color || "#6E6E6E",
        description: label.description || "",
        id: label.id,
        projectId: label.projectId,
        type: label.type as "status" | "priority",
        name: label.name,
        order: label.order,
        createdAt: label.createdAt,
        updatedAt: label.updatedAt,
        createdBy: label.createdBy,
        updatedBy: label.updatedBy,
      }
    },
    []
  )

  const fetchLabels = useCallback(async () => {
    if (!projectId) {
      setStatusLabels([])
      setPriorityLabels([])
      setAllLabels([])
      setIsLoading(false)
      setError(null)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      if (!db.labels) {
        throw new Error("Labels collection not available")
      }

      // Clean up existing subscription
      if (labelsSubscription.current) {
        labelsSubscription.current.unsubscribe()
        labelsSubscription.current = null
      }

      // Set up reactive subscription for labels
      labelsSubscription.current = db.labels
        .find({
          selector: { projectId },
          sort: [{ type: "asc" }, { order: "asc" }],
        })
        .$.subscribe({
          next: (labelDocs: Array<{ toJSON(): LabelDocType }>) => {
            const labels = labelDocs.map(transformLabelDoc)

            const statusLabelsList = labels.filter((l) => l.type === "status")
            const priorityLabelsList = labels.filter(
              (l) => l.type === "priority"
            )

            setStatusLabels(statusLabelsList)
            setPriorityLabels(priorityLabelsList)
            setAllLabels(labels)
            setIsLoading(false)
          },
          error: (err: Error) => {
            console.error("Labels subscription error:", err)
            setError("Failed to load project labels")
            setIsLoading(false)
          },
        })
    } catch (err) {
      console.error("Error setting up labels subscription:", err)
      setError(
        err instanceof Error ? err.message : "Failed to load project labels"
      )
      setStatusLabels([])
      setPriorityLabels([])
      setAllLabels([])
      setIsLoading(false)
    }
  }, [db.labels, projectId, transformLabelDoc])

  const refetch = useCallback(async () => {
    await fetchLabels()
  }, [fetchLabels])

  const getStatusLabelById = useCallback(
    (id: string) => {
      return statusLabels.find((label) => label.id === id)
    },
    [statusLabels]
  )

  const getPriorityLabelById = useCallback(
    (id: string) => {
      return priorityLabels.find((label) => label.id === id)
    },
    [priorityLabels]
  )

  const getLabelsByType = useCallback(
    (type: "status" | "priority") => {
      return type === "status" ? statusLabels : priorityLabels
    },
    [statusLabels, priorityLabels]
  )

  // Setup subscription on mount and cleanup on unmount
  useEffect(() => {
    fetchLabels()

    return () => {
      if (labelsSubscription.current) {
        labelsSubscription.current.unsubscribe()
        labelsSubscription.current = null
      }
    }
  }, [fetchLabels])

  return {
    statusLabels,
    priorityLabels,
    allLabels,
    isLoading,
    error,
    refetch,
    getStatusLabelById,
    getPriorityLabelById,
    getLabelsByType,
  }
}
