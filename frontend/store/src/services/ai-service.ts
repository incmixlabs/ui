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

interface BulkGenerateRequest {
  type: string
  taskIds: string[]
}

export interface BulkQueueResponse {
  message: string
  queueId?: string
}

export interface BulkGenerateResponse {
  success: boolean
  message?: string
  results?: {
    taskId: string
    success: boolean
    data?: ProcessedUserStory
    error?: string
  }[]
  stats?: {
    successful: number
    failed: number
    total: number
  }
}

export interface JobStatus {
  taskId: string
  jobTitle: string
  jobId: string
  status: "pending" | "in_progress" | "completed" | "failed"
}

export interface JobStatusResponse {
  userStory: JobStatus[]
  codegen: JobStatus[]
}

export interface TaskGenerationStatus {
  taskId: string
  status: "pending" | "processing" | "completed" | "failed"
  data?: ProcessedUserStory
  error?: string
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
        })) || []

      // Format checklist items
      const checklistItems =
        userStory.checklist?.map((text, index) => ({
          id: `cl-${Date.now()}-${index}`,
          text,
          checked: false,
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

  /**
   * Queue tasks for bulk AI generation
   */
  queueBulkGeneration: async (
    taskIds: string[],
    opts?: { signal?: AbortSignal }
  ): Promise<BulkQueueResponse> => {
    // Validate input
    if (!Array.isArray(taskIds)) {
      throw new Error("Task IDs array is required and must not be empty")
    }
    const uniqueIds = Array.from(
      new Set(
        taskIds
          .map((id) => (typeof id === "string" ? id.trim() : ""))
          .filter((id) => id.length > 0)
      )
    )
    if (uniqueIds.length === 0) {
      throw new Error("Task IDs array is required and must not be empty")
    }

    if (uniqueIds.length > 100) {
      throw new Error("Maximum 100 tasks allowed per batch")
    }

    try {
      const response = await fetch(`${BASE_API_URL}/api/tasks/bulk-ai-gen`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal: opts?.signal,
        body: JSON.stringify({
          type: "user-story",
          taskIds: uniqueIds,
        } as BulkGenerateRequest),
      })

      if (!response.ok) {
        await response.json().catch(() => {
          // Silently handle parsing errors
        })
        throw new Error(
          response.status >= 500
            ? "Bulk AI service temporarily unavailable. Please try again later."
            : `Bulk generation request failed: ${response.status}`
        )
      }

      const data = (await response.json()) as BulkQueueResponse

      return data
    } catch (error) {
      console.error("Failed to queue bulk generation:", error)
      throw error
    }
  },

  /**
   * Check status of AI generation for specific tasks
   */
  checkGenerationStatus: async (
    taskIds: string[],
    opts?: { signal?: AbortSignal }
  ): Promise<TaskGenerationStatus[]> => {
    if (!Array.isArray(taskIds) || taskIds.length === 0) {
      return []
    }

    const uniqueIds = Array.from(
      new Set(
        taskIds
          .map((id) => (typeof id === "string" ? id.trim() : ""))
          .filter((id) => id.length > 0)
      )
    )

    try {
      const response = await fetch(`${BASE_API_URL}/api/tasks/jobs/status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal: opts?.signal,
      })

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.status}`)
      }

      const data = (await response.json()) as JobStatusResponse

      // Filter userStory jobs for the requested taskIds
      const relevantJobs =
        data.userStory?.filter((job) => uniqueIds.includes(job.taskId)) || []

      return uniqueIds.map((taskId) => {
        const taskJobs = relevantJobs.filter((j) => j.taskId === taskId)

        if (taskJobs.length === 0) {
          return {
            taskId,
            status: "pending" as const,
            error: undefined,
          }
        }

        // Check if all jobs for this task are completed
        const allCompleted = taskJobs.every((job) => job.status === "completed")
        const hasInProgress = taskJobs.some(
          (job) => job.status === "in_progress"
        )
        const hasFailed = taskJobs.some((job) => job.status === "failed")

        let status: "pending" | "processing" | "completed" | "failed"
        if (allCompleted) {
          status = "completed"
        } else if (hasFailed) {
          status = "failed"
        } else if (hasInProgress) {
          status = "processing"
        } else {
          status = "pending"
        }

        return {
          taskId,
          status,
          error: hasFailed ? "Some jobs failed" : undefined,
        }
      })
    } catch (error) {
      console.error("Failed to check generation status:", error)
      // Treat transient errors as pending to avoid premature terminal failure
      return Array.from(new Set(taskIds)).map((taskId) => ({
        taskId,
        status: "pending" as const,
      }))
    }
  },

  /**
   * Poll for completed AI generation results
   */
  pollForResults: async (
    taskIds: string[],
    opts?: {
      signal?: AbortSignal
      maxAttempts?: number
      intervalMs?: number
      onProgress?: (progress: {
        completed: number
        total: number
        processing: number
        pending: number
      }) => void
    }
  ): Promise<BulkGenerateResponse> => {
    const maxAttempts = opts?.maxAttempts || 30 // 5 minutes with 5s intervals
    const intervalMs = opts?.intervalMs || 3000 // 5 seconds (faster polling)
    let attempts = 0

    while (attempts < maxAttempts) {
      if (opts?.signal?.aborted) {
        throw new Error("Polling cancelled")
      }

      const statuses = await aiService.checkGenerationStatus(taskIds, opts)
      const completedStatuses = statuses.filter((s) => s.status === "completed")
      const failedStatuses = statuses.filter((s) => s.status === "failed")
      const completed = [...completedStatuses, ...failedStatuses]

      // Report progress to callback if provided
      const pending = statuses.filter((s) => s.status === "pending").length
      const processing = statuses.filter(
        (s) => s.status === "processing"
      ).length

      console.log(
        `AI Generation Progress: ${completed.length}/${taskIds.length} completed (${completedStatuses.length} succeeded, ${failedStatuses.length} failed), ${processing} processing, ${pending} pending`
      )

      // Call progress callback if provided
      if (opts?.onProgress) {
        opts.onProgress({
          completed: completed.length,
          total: taskIds.length,
          processing,
          pending,
        })
      }

      if (completed.length === taskIds.length) {
        // All tasks completed, return results
        const successfulCount = completedStatuses.length
        const failedCount = failedStatuses.length

        const results = statuses.map((status) => ({
          taskId: status.taskId,
          success: status.status === "completed",
          data: undefined, // No data returned from API - will be synced via RxDB
          error: status.error,
        }))

        return {
          success: successfulCount > 0, // Success if at least one task succeeded
          message:
            successfulCount > 0
              ? `AI content generated successfully! ${successfulCount} task${successfulCount !== 1 ? "s" : ""} completed${failedCount > 0 ? `, ${failedCount} failed` : ""}. Content will appear shortly.`
              : `AI generation failed for all ${failedCount} task${failedCount !== 1 ? "s" : ""}`,
          results,
          stats: {
            successful: successfulCount,
            failed: failedCount,
            total: taskIds.length,
          },
        }
      }

      // Wait before next poll
      await new Promise((resolve) => setTimeout(resolve, intervalMs))
      attempts++
    }

    // Timeout - return partial results
    const statuses = await aiService.checkGenerationStatus(taskIds, opts)
    const completedCount = statuses.filter(
      (s) => s.status === "completed"
    ).length
    const results = statuses.map((status) => ({
      taskId: status.taskId,
      success: status.status === "completed",
      data: undefined,
      error:
        status.error ||
        (status.status === "pending" ? "Generation timeout" : undefined),
    }))

    return {
      success: completedCount > 0,
      message:
        completedCount > 0
          ? `Partial success: ${completedCount} task${completedCount !== 1 ? "s" : ""} completed, others timed out after ${(maxAttempts * intervalMs) / 1000}s`
          : `Generation timed out after ${(maxAttempts * intervalMs) / 1000}s - no tasks completed`,
      results,
      stats: {
        successful: completedCount,
        failed: taskIds.length - completedCount,
        total: taskIds.length,
      },
    }
  },

  /**
   * Complete bulk generation workflow: queue + poll for results
   */
  bulkGenerateUserStories: async (
    taskIds: string[],
    opts?: {
      signal?: AbortSignal
      onProgress?: (progress: {
        completed: number
        total: number
        processing: number
        pending: number
      }) => void
    }
  ): Promise<BulkGenerateResponse> => {
    // First, queue the tasks
    await aiService.queueBulkGeneration(taskIds, opts)

    // Then poll for results with progress callback
    return aiService.pollForResults(taskIds, opts)
  },
}
