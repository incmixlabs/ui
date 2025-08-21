import type { TaskDataSchema } from "@incmix/utils/schema"
import { useCallback, useState } from "react"
import type { ProcessedUserStory } from "../../api/ai-service"
import { useAIFeaturesStore } from "./use-ai-features-store"
import { useAIUserStory } from "./use-ai-user-story"

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
  const { generateUserStory } = useAIUserStory()

  const generateForTasks = useCallback(
    async (tasks: TaskToUpdate[]) => {
      // Don't proceed if AI is disabled or if already generating
      if (!useAI || isGenerating || tasks.length === 0) {
        return { success: false, message: "Cannot generate content" }
      }

      setIsGenerating(true)
      setError(null)
      setStats({ total: tasks.length, completed: 0, failed: 0 })

      let completed = 0
      let failed = 0

      try {
        // Process tasks sequentially to avoid rate limiting
        for (const task of tasks) {
          try {
            // Generate content using the AI service
            const userStoryResult: ProcessedUserStory | null =
              await generateUserStory(task.name)

            // Update the task with the AI generated content if successful
            if (userStoryResult) {
              // Transform the AI-generated content to match TaskDataSchema structure
              const checklist = userStoryResult.checklist.map(
                (item, index) => ({
                  id: item.id,
                  text: item.text,
                  checked: item.checked || false,
                  order: index, // Add required order property
                })
              )

              const acceptanceCriteria = userStoryResult.acceptanceCriteria.map(
                (item, index) => ({
                  id: item.id,
                  text: item.text,
                  checked: false, // Add required checked property
                  order: index, // Add required order property
                })
              )

              await updateTaskFn(task.id, {
                // Using id instead of taskId
                description: userStoryResult.description,
                checklist,
                acceptanceCriteria,
              })
              completed++
            } else {
              failed++
            }
          } catch (err) {
            failed++
            console.error(
              `Failed to generate content for task "${task.name}" (${task.id}):`,
              err
            )
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
    [useAI, isGenerating, generateUserStory, updateTaskFn]
  )

  return {
    generateForTasks,
    isGenerating,
    stats,
    error,
    clearError: () => setError(null),
  }
}
