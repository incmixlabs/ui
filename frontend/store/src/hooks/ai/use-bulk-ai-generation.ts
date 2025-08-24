import type { TaskDataSchema } from "@incmix/utils/schema"
import { useCallback, useState } from "react"
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

export function useBulkAIGeneration(
  updateTaskFn: (
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
  const { useAI } = useAIFeaturesStore()

  const generateForTasks = useCallback(
    async (tasks: TaskToUpdate[]) => {
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
      setStats({
        total: tasks.length,
        completed: 0,
        failed: 0,
        processing: 0,
        pending: tasks.length,
      })

      try {
        // Use bulk AI generation endpoint with progress callback
        const taskIds = tasks.map((task) => task.id)
        const bulkResult = await aiService.bulkGenerateUserStories(taskIds, {
          onProgress: (progress) => {
            // Update stats with real-time progress from the API polling
            setStats({
              total: progress.total,
              completed: progress.completed,
              failed: 0, // We'll get final failed count at the end
              processing: progress.processing,
              pending: progress.pending,
            })
          },
        })

        // No need to process results since API doesn't return data
        // The data will be synced via RxDB pull replication
        const finalStats = bulkResult.stats || {
          successful: 0,
          failed: 0,
          total: tasks.length,
        }

        // Update final stats
        setStats({
          total: finalStats.total,
          completed: finalStats.successful + finalStats.failed,
          failed: finalStats.failed,
          processing: 0,
          pending: 0,
        })

        return {
          success: bulkResult.success,
          message: bulkResult.message || "Generation completed",
          stats: finalStats,
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error"
        setError(`Failed to generate content: ${errorMessage}`)
        return { success: false, message: errorMessage, stats: null }
      } finally {
        setIsGenerating(false)
      }
    },
    [useAI, isGenerating, updateTaskFn]
  )

  return {
    generateForTasks,
    isGenerating,
    stats,
    error,
    clearError: () => setError(null),
  }
}
