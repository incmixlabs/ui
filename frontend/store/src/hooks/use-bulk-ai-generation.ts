import { useState, useCallback } from 'react'
import { useAIUserStory } from './use-ai-user-story'
import { useAIFeaturesStore } from './use-ai-features-store'
import type { ProcessedUserStory } from '../services/ai-service'

interface TaskToUpdate {
  taskId: string
  name: string
}

interface BulkGenerationStats {
  total: number
  completed: number
  failed: number
}

export function useBulkAIGeneration(updateTaskFn: (taskId: string, updates: any) => Promise<void>) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [stats, setStats] = useState<BulkGenerationStats>({ total: 0, completed: 0, failed: 0 })
  const [error, setError] = useState<string | null>(null)
  const { useAI } = useAIFeaturesStore()
  const { generateUserStory } = useAIUserStory()

  const generateForTasks = useCallback(async (tasks: TaskToUpdate[]) => {
    // Don't proceed if AI is disabled or if already generating
    if (!useAI || isGenerating || tasks.length === 0) {
      return { success: false, message: 'Cannot generate content' }
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
          const userStoryResult: ProcessedUserStory | null = await generateUserStory(task.name)

          // Update the task with the AI generated content if successful
          if (userStoryResult) {
            await updateTaskFn(task.taskId, {
              description: userStoryResult.description,
              checklist: userStoryResult.checklist,
              acceptanceCriteria: userStoryResult.acceptanceCriteria
            })
            completed++
          } else {
            failed++
          }
        } catch (err) {
          failed++
          console.error(`Failed to generate content for task "${task.name}":`, err)
        }
        
        // Update progress
        setStats({ total: tasks.length, completed, failed })
      }

      return { 
        success: true, 
        message: `Generated content for ${completed} task${completed !== 1 ? 's' : ''}${failed > 0 ? `, ${failed} failed` : ''}`
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(`Failed to generate content: ${errorMessage}`)
      return { success: false, message: errorMessage }
    } finally {
      setIsGenerating(false)
    }
  }, [useAI, isGenerating, generateUserStory, updateTaskFn])

  return {
    generateForTasks,
    isGenerating,
    stats,
    error,
    clearError: () => setError(null)
  }
}
