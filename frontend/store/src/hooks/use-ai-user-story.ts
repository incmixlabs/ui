import { useState } from "react"
import { aiService } from "../services/ai-service"
import { useAIFeaturesStore } from "./use-ai-features-store"

/**
 * Hook for using AI to generate user stories for task descriptions
 */
export function useAIUserStory() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { useAI } = useAIFeaturesStore()

  /**
   * Generate a user story based on a task title/prompt
   * Returns empty string if AI is disabled or if an error occurs
   */
  const generateUserStory = async (
    taskTitle: string,
    userTier = "free",
    templateId = 1
  ): Promise<string> => {
    // Don't generate anything if AI is disabled
    if (!useAI || !taskTitle.trim()) return ""

    setIsGenerating(true)
    setError(null)

    try {
      // Call the AI service to generate the user story
      const userStory = await aiService.generateUserStory(
        taskTitle,
        userTier,
        templateId
      )
      return userStory || ""
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      setError(`Failed to generate description: ${errorMessage}`)
      return ""
    } finally {
      setIsGenerating(false)
    }
  }

  return {
    generateUserStory,
    isGenerating,
    error,
    clearError: () => setError(null),
  }
}
