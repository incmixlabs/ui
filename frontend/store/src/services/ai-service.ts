/**
 * AI Service - Handles API calls to the AI backend services
 */

// Get base API URL from environment variables
const BASE_API_URL = import.meta.env.VITE_BFF_API_URL || "http://localhost:8080"

interface GenerateUserStoryRequest {
  prompt: string
  userTier?: string
  templateId?: number
}

export interface UserStoryResponse {
  userStory: {
    description: string
    acceptanceCriteria: string[]
    checklist: string[]
  }
}

export interface ProcessedUserStory {
  description: string
  acceptanceCriteria: { id: string; text: string }[]
  checklist: { id: string; text: string; checked: boolean }[]
}

/**
 * AI Service for generating content using GenAI
 */
export const aiService = {
  /**
   * Generate a user story based on a task title/prompt
   */
  generateUserStory: async (
    prompt: string,
    userTier = "free",
    templateId = 1
  ): Promise<ProcessedUserStory> => {
    // Validate input
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      throw new Error("Prompt is required and must be a non-empty string")
    }

    if (prompt.length > 1000) {
      throw new Error("Prompt must be less than 1000 characters")
    }

    try {
      const response = await fetch(
        `${BASE_API_URL}/api/genai/generate-user-story`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Include credentials to send cookies/auth headers
          credentials: "include",
          body: JSON.stringify({
            prompt,
            userTier,
            templateId,
          } as GenerateUserStoryRequest),
        }
      )

      if (!response.ok) {
        // Attempt to parse error but don't expose details
        await response.json().catch(() => {
          // Silently handle parsing errors
        })
        throw new Error(
          response.status >= 500
            ? "AI service temporarily unavailable. Please try again later."
            : `Request failed: ${response.status}`
        )
      }

      const data = (await response.json()) as UserStoryResponse

      // Process the new response format
      const { userStory } = data

      // Keep description separate
      const descriptionText = userStory.description || ""

      // Format acceptance criteria items
      const acceptanceCriteriaItems =
        userStory.acceptanceCriteria?.map((text, index) => ({
          id: `ac-${Date.now()}-${index}`,
          text,
          checked: false, // Add required checked property
          order: index, // Add required order property
        })) || []

      // Format checklist items
      const checklistItems =
        userStory.checklist?.map((text, index) => ({
          id: `cl-${Date.now()}-${index}`,
          text,
          checked: false,
          order: index, // Add required order property
        })) || []

      return {
        description: descriptionText,
        acceptanceCriteria: acceptanceCriteriaItems,
        checklist: checklistItems,
      }
    } catch (error) {
      console.error("Failed to generate user story:", error)
      throw error
    }
  },
}
