/**
 * AI Service - Handles API calls to the AI backend services
 */

// Get base API URL from environment variables
const BASE_API_URL = import.meta.env.VITE_BFF_API_URL || 'http://localhost:8080';

interface GenerateUserStoryRequest {
  prompt: string;
  userTier?: string;
  templateId?: number;
}

interface GenerateUserStoryResponse {
  userStory: string;
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
    userTier = 'free',
    templateId = 1
  ): Promise<string> => {
    try {
      // Debug session cookie
      console.log('Cookies available:', document.cookie);
      console.log('Session cookie:', document.cookie.split('; ').find(row => row.startsWith('session=')));
      console.log('API URL:', `${BASE_API_URL}/api/genai/generate-user-story`);
      
      const response = await fetch(`${BASE_API_URL}/api/genai/generate-user-story`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Include credentials to send cookies/auth headers
        credentials: 'include',
        body: JSON.stringify({
          prompt,
          userTier,
          templateId,
        } as GenerateUserStoryRequest),
      });

      // Debug response information
      console.log('Response status:', response.status);
      // Convert headers to object for logging (handling browser compatibility)
      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
      console.log('Response headers:', headers);
      
      if (!response.ok) {
        const errorData = await response.json().catch((err) => {
          console.error('Error parsing error response:', err);
          return {};
        });
        console.error('API error details:', errorData);
        throw new Error(
          `API error: ${response.status} - ${errorData.message || response.statusText}`
        );
      }

      const data = await response.json() as GenerateUserStoryResponse;
      return data.userStory;
    } catch (error) {
      console.error('Failed to generate user story:', error);
      throw error;
    }
  },
};
