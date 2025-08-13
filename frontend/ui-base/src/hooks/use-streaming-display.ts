import { useEffect, useState } from "react"

interface UseStreamingDisplayOptions<T> {
  streamingData: T
  isStreaming: boolean
  connectionStatus: string
  onDataUpdate?: (data: T) => void
}

interface UseStreamingDisplayReturn<T> {
  displayData: T
  hasData: boolean
  resetDisplay: () => void
}

export function useStreamingDisplay<T extends Record<string, unknown>>({
  streamingData,
  isStreaming,
  connectionStatus,
  onDataUpdate,
}: UseStreamingDisplayOptions<T>): UseStreamingDisplayReturn<T> {
  const [displayData, setDisplayData] = useState<T>({} as T)
  const [hasData, setHasData] = useState(false)

  useEffect(() => {
    // console.log("Streaming state changed:", {
    //   isStreaming,
    //   connectionStatus,
    //   dataKeys: Object.keys(streamingData),
    //   hasData,
    // });

    if (isStreaming) {
      // Update data immediately as it streams
      setDisplayData(streamingData)
      if (Object.keys(streamingData).length > 0) {
        setHasData(true)
      }
    } else if (connectionStatus === "completed") {
      console.log("Streaming completed, setting final data")
      setDisplayData(streamingData)
      if (Object.keys(streamingData).length > 0) {
        setHasData(true)
      }
    } else if (connectionStatus === "idle") {
      // Reset when going back to idle state
      setDisplayData({} as T)
      setHasData(false)
    }

    // Call optional callback when data updates
    if (onDataUpdate) {
      onDataUpdate(streamingData)
    }
  }, [streamingData, isStreaming, connectionStatus])

  const resetDisplay = () => {
    setDisplayData({} as T)
    setHasData(false)
  }

  return {
    displayData,
    hasData,
    resetDisplay,
  }
}
