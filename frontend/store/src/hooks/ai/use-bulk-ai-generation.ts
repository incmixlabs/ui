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
  })
  const [error, setError] = useState<string | null>(null)
  const { useAI } = useAIFeaturesStore()

  const generateForTasks = useCallback(
    async (tasks: TaskToUpdate[]) => {
      // Don't proceed if AI is disabled or if already generating
      if (!useAI || isGenerating || tasks.length === 0) {
        return { success: false, message: "Cannot generate content" }
      }

      setIsGenerating(true)
      setError(null)
      setStats({ total: tasks.length, completed: 0, failed: 0 })

      try {
        // Use bulk AI generation endpoint - single API call for all tasks
        const taskIds = tasks.map((task) => task.id)
        const bulkResult = await aiService.bulkGenerateUserStories(taskIds)

        if (!bulkResult.success || !bulkResult.results) {
          throw new Error(bulkResult.message || "Bulk generation failed")
        }

        let completed = 0
        let failed = 0

        // Process the bulk results and update tasks
        for (const result of bulkResult.results) {
          try {
            if (result.success && result.data) {
              // Transform the AI-generated content to match TaskDataSchema structure
              const checklist = result.data.checklist.map((item, index) => ({
                id: item.id,
                text: item.text,
                checked: item.checked || false,
                order: index, // Add required order property
              }))

              const acceptanceCriteria = result.data.acceptanceCriteria.map(
                (item, index) => ({
                  id: item.id,
                  text: item.text,
                  checked: false, // Add required checked property
                  order: index, // Add required order property
                })
              )

              await updateTaskFn(result.taskId, {
                description: result.data.description,
                checklist,
                acceptanceCriteria,
              })
              completed++
            } else {
              failed++
              console.error(
                `Failed to generate content for task ${result.taskId}:`,
                result.error
              )
            }
          } catch (err) {
            failed++
            console.error(`Failed to update task ${result.taskId}:`, err)
          }

          // Update progress
          setStats({ total: tasks.length, completed, failed })
        }

        return {
          success: true,
          message: `Generated content for ${completed} task${completed !== 1 ? "s" : ""}${failed > 0 ? `, ${failed} failed` : ""}`,
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error"
        setError(`Failed to generate content: ${errorMessage}`)
        return { success: false, message: errorMessage }
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
