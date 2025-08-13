import { useEffect, useRef, useState } from "react"
import { GENAI_API_URL } from "../utils/constants"

export type ConnectionStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "completed"
  | "error"
  | "stopped"

export interface StreamingOptions {
  endpoint: string
  method?: "GET" | "POST" | "PUT" | "DELETE"
  headers?: Record<string, string>
  credentials?: RequestCredentials
  body?: unknown
  onData?: (data: unknown) => void
  onError?: (error: string) => void
  onComplete?: () => void
  onStatusChange?: (status: ConnectionStatus) => void
}

export interface StreamingState<T = Record<string, unknown>> {
  data: T
  isStreaming: boolean
  error: string | null
  connectionStatus: ConnectionStatus
}

export interface StreamingActions {
  startStreaming: () => Promise<void>
  stopStreaming: () => void
  reset: () => void
}

const BASE_URL = GENAI_API_URL

export function useStreamingResponse<T = Record<string, unknown>>(
  options: StreamingOptions
): [StreamingState<T>, StreamingActions] {
  const [state, setState] = useState<StreamingState<T>>({
    data: {} as T,
    isStreaming: false,
    error: null,
    connectionStatus: "idle",
  })

  const abortControllerRef = useRef<AbortController | null>(null)

  const updateState = (updates: Partial<StreamingState<T>>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  const updateConnectionStatus = (status: ConnectionStatus) => {
    updateState({ connectionStatus: status })
    options.onStatusChange?.(status)
  }

  const startStreaming = async (): Promise<void> => {
    if (state.isStreaming) return

    updateState({
      isStreaming: true,
      error: null,
      data: {} as T,
    })
    updateConnectionStatus("connecting")

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController()

    try {
      const requestOptions: RequestInit = {
        method: options.method || "POST",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        credentials: options.credentials || "include",
        signal: abortControllerRef.current.signal,
      }

      if (options.body) {
        requestOptions.body = JSON.stringify(options.body)
      }

      // Make request to the API endpoint
      const response = await fetch(
        `${BASE_URL}${options.endpoint}`,
        requestOptions
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      if (!response.body) {
        throw new Error("No response body")
      }

      updateConnectionStatus("connected")

      // Handle the streaming response
      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      const processStream = async (): Promise<void> => {
        try {
          while (true) {
            const { done, value } = await reader.read()

            if (done) {
              updateConnectionStatus("completed")
              updateState({ isStreaming: false })
              options.onComplete?.()
              break
            }

            // Decode the chunk
            const chunk = decoder.decode(value, { stream: true })

            // Split by lines in case multiple events are in one chunk
            const lines = chunk.split("\n")

            for (const line of lines) {
              if (line.trim() === "") continue

              // Handle SSE format (data: {...})
              if (line.startsWith("data: ")) {
                const jsonStr = line.slice(6).trim()
                if (jsonStr === "[DONE]") {
                  updateConnectionStatus("completed")
                  updateState({ isStreaming: false })
                  options.onComplete?.()
                  return
                }

                try {
                  const data = JSON.parse(jsonStr)

                  // Handle direct object streaming
                  if (data && typeof data === "object") {
                    setState((prev: StreamingState<T>) => ({
                      ...prev,
                      data: {
                        ...prev.data,
                        ...data,
                      } as T,
                    }))
                    options.onData?.(data)
                  }

                  // Handle Vercel AI SDK format if present
                  else if (data.type === "object") {
                    setState((prev: StreamingState<T>) => ({
                      ...prev,
                      data: {
                        ...prev.data,
                        ...data.object,
                      } as T,
                    }))
                    options.onData?.(data.object)
                  } else if (data.type === "finish") {
                    updateConnectionStatus("completed")
                    updateState({ isStreaming: false })
                    options.onComplete?.()
                    return
                  }
                } catch (parseError) {
                  console.warn("Could not parse JSON:", jsonStr, parseError)
                }
              }
            }
          }
        } catch (streamError) {
          if (
            streamError instanceof Error &&
            streamError.name === "AbortError"
          ) {
            updateConnectionStatus("stopped")
            return
          }
          console.error("Stream processing error:", streamError)
          const errorMessage = "Error processing stream"
          updateState({
            error: errorMessage,
            isStreaming: false,
          })
          updateConnectionStatus("error")
          options.onError?.(errorMessage)
        }
      }

      await processStream()
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        updateConnectionStatus("stopped")
        return
      }
      console.error("Error starting stream:", err)
      const errorMessage = `Failed to start streaming: ${err instanceof Error ? err.message : "Unknown error"}`
      updateState({
        error: errorMessage,
        isStreaming: false,
      })
      updateConnectionStatus("error")
      options.onError?.(errorMessage)
    }
  }

  const stopStreaming = (): void => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    updateState({ isStreaming: false })
    updateConnectionStatus("stopped")
  }

  const reset = (): void => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    updateState({
      data: {} as T,
      isStreaming: false,
      error: null,
      connectionStatus: "idle",
    })
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const actions: StreamingActions = {
    startStreaming,
    stopStreaming,
    reset,
  }

  return [state, actions]
}
