import type { TaskDataSchema } from "@incmix/utils/schema"
import { useCallback, useEffect, useRef, useState } from "react"
import { aiService } from "../../services/ai-service"
import { useAIFeaturesStore } from "./use-ai-features-store"

interface TaskToUpdate {
  id: string // Changed from taskId to id to match schema
  name: string
}

interface BulkGenerationStats {
  total: number
  completed: number
  failed: number
  processing: number
  pending: number
}

type BulkGenerateOutcome = {
  success: boolean
  message: string
  stats: BulkGenerationStats | null
}

export function useBulkAIGeneration(
  _updateTaskFn: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [stats, setStats] = useState<BulkGenerationStats>({
    total: 0,
    completed: 0,
    failed: 0,
    processing: 0,
    pending: 0,
  })
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const { useAI } = useAIFeaturesStore()

  const generateForTasks = useCallback(
    async (tasks: TaskToUpdate[]): Promise<BulkGenerateOutcome> => {
      // Don't proceed if AI is disabled or if already generating
      if (!useAI || isGenerating || tasks.length === 0) {
        return {
          success: false,
          message: "Cannot generate content",
          stats: null,
        }
      }

      setIsGenerating(true)
      setError(null)
      // Normalize & de-duplicate IDs to keep UI and service totals aligned
      const uniqueTaskIds = Array.from(
        new Set(
          tasks
            .map((t) => (typeof t.id === "string" ? t.id.trim() : ""))
            .filter((id) => id.length > 0)
        )
      )
      setStats({
        total: uniqueTaskIds.length,
        completed: 0,
        failed: 0,
        processing: 0,
        pending: uniqueTaskIds.length,
      })

      // Nothing valid to process after normalization
      if (uniqueTaskIds.length === 0) {
        setIsGenerating(false)
        return {
          success: false,
          message: "No valid task IDs",
          stats: {
            total: 0,
            completed: 0,
            failed: 0,
            processing: 0,
            pending: 0,
          },
        }
      }

      try {
        // Create abort controller for this operation
        abortControllerRef.current = new AbortController()

        // Use bulk AI generation endpoint with progress callback
        const bulkResult = await aiService.bulkGenerateUserStories(
          uniqueTaskIds,
          {
            signal: abortControllerRef.current.signal,
            onProgress: (progress) => {
              // Only update if operation is still active
              if (
                abortControllerRef.current &&
                !abortControllerRef.current.signal.aborted
              ) {
                setStats({
                  total: progress.total,
                  completed: progress.completed,
                  failed: 0, // We'll get final failed count at the end
                  processing: progress.processing,
                  pending: progress.pending,
                })
              }
            },
          }
        )

        // No need to process results since API doesn't return data
        // The data will be synced via RxDB pull replication
        const finalStatsRaw = bulkResult.stats || {
          successful: 0,
          failed: 0,
          total: uniqueTaskIds.length,
        }

        // Update final stats
        const finalUiStats: BulkGenerationStats = {
          total: finalStatsRaw.total,
          completed: finalStatsRaw.successful + finalStatsRaw.failed,
          failed: finalStatsRaw.failed,
          processing: 0,
          pending: 0,
        }
        setStats(finalUiStats)

        return {
          success: bulkResult.success,
          message: bulkResult.message || "Generation completed",
          stats: finalUiStats,
        }
      } catch (err) {
        // Handle abort gracefully
        if (err instanceof Error && err.name === "AbortError") {
          return {
            success: false,
            message: "Generation cancelled",
            stats: null,
          }
        }

        const errorMessage =
          err instanceof Error ? err.message : "Unknown error"
        setError(`Failed to generate content: ${errorMessage}`)
        return { success: false, message: errorMessage, stats: null }
      } finally {
        abortControllerRef.current = null
        setIsGenerating(false)
      }
    },
    [useAI, isGenerating]
  )

  const cancelGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
      setIsGenerating(false)
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
        abortControllerRef.current = null
      }
    }
  }, [])

  return {
    generateForTasks,
    isGenerating,
    stats,
    error,
    clearError: () => setError(null),
    cancelGeneration,
  }
}
